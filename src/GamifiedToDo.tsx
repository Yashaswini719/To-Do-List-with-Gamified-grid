import React, { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const padTasks = (tasks: any[]) => {
  const padded = Array(9).fill(null);
  tasks.forEach((t,i) => { if(i<9) padded[i] = t });
  return padded;
};

const GamifiedToDo: React.FC = () => {
  const { tasks, addTask, toggleComplete, editTask, deleteTask } = useAppContext();
  const [gridTasks, setGridTasks] = useState(padTasks(tasks));
  const [win, setWin] = useState(false);

  useEffect(() => { setGridTasks(padTasks(tasks)); }, [tasks]);

  useEffect(() => {
    const won = WIN_LINES.some(line => line.every(i => gridTasks[i]?.completed));
    setWin(won);
  }, [gridTasks]);

  const handleAddTask = () => {
    if(tasks.length >= 9) return alert("Grid full! Delete tasks first.");
    const text = prompt("Enter task description:");
    if(text && text.trim()) addTask(text.trim());
  };

  return (
    <div className="board-root gamified-board">
      <h3>Gamified Tic-Tac-Toe To-Do</h3>
      <div className="grid">
        {gridTasks.map((task, idx) => (
          <div key={idx} className={`grid-cell ${task?.completed ? "completed" : ""}`}>
            {task ? (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <input
                  type="text"
                  value={task.text}
                  maxLength={30}
                  onChange={(e) => editTask(task.id, e.target.value)}
                />
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
              </>
            ) : (
              <button className="add-task-btn" onClick={handleAddTask}>+ Add Task</button>
            )}
          </div>
        ))}
      </div>
      {win && <div className="celebration-message">🎉 🎉 Three in a row completed! 🎉 🎉</div>}
    </div>
  );
};

export default GamifiedToDo;
