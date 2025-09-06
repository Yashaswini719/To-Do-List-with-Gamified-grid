import React, { createContext, useContext, useState } from "react";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type AppContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleComplete: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  const toggleComplete = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };
  const editTask = (id: number, newText: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };
  const deleteTask = (id: number) => setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <AppContext.Provider value={{ tasks, addTask, toggleComplete, editTask, deleteTask }}>
      {children}
    </AppContext.Provider>
  );
};
