import React, { useState } from "react";
import { useAppContext } from "./AppContext";
import { motion, AnimatePresence } from "framer-motion";

const NormalToDo: React.FC = () => {
  const { tasks, addTask, toggleComplete, editTask, deleteTask } = useAppContext();
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="board-root">
      <div className="card todo-card">
        <h3>To Do list</h3>
        <ul>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 450, damping: 27 }}
                className={task.completed ? "completed" : ""}
              >
                <span className="circle" onClick={() => toggleComplete(task.id)}>
                  {task.completed && <motion.span layoutId="check" className="tick">✔</motion.span>}
                </span>
                <input
                  value={task.text}
                  onChange={(e) => editTask(task.id, e.target.value)}
                  className="task-input"
                />
                <button onClick={() => deleteTask(task.id)} className="delete-btn">×</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <input
          className="add-task-input"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
      </div>
      {/* Add Notes, Focus, Remember blocks here with similar styles if desired */}
    </div>
  );
};

export default NormalToDo;
