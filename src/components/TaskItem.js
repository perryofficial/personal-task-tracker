import React from "react";

export default function TaskItem({ task, toggleComplete, deleteTask, startEdit }) {
  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green"
  };

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <small>{new Date(task.createdAt).toLocaleString()}</small>

          {/* 🗓️ Due Date */}
          {task.dueDate && (
            <p className={`due-date ${isOverdue ? "overdue" : ""}`}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          {/* 🔥 Priority Badge */}
          <span
            className="priority-badge"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => startEdit(task)}>Edit</button>
        <button onClick={() => deleteTask(task.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
