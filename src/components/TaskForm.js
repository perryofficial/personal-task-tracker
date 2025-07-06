import React, { useState, useEffect } from "react";

export default function TaskForm({ addTask, editTask, editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(""); // 🆕 Due Date

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = { title, description, priority, dueDate };
    if (editingTask) {
      editTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setEditingTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High Priority 🔴</option>
        <option value="Medium">Medium Priority 🟡</option>
        <option value="Low">Low Priority 🟢</option>
      </select>

      {/* 🗓️ Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}
