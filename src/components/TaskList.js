import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";

export default function TaskList({ tasks, setTasks }) {
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState(""); // 🔍 New search state

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) // 🔍 Filter by search
    );

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="task-dashboard">
      <TaskForm
        addTask={addTask}
        editTask={editTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskFilter currentFilter={filter} setFilter={setFilter} counts={counts} />

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Task list */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              startEdit={setEditingTask}
            />
          ))
        ) : (
          <p className="empty-state">No tasks found.</p>
        )}
      </div>
    </div>
  );
}
