import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import DarkModeToggle from "./components/DarkModeToggle";

// Helper functions for per-user storage
const loadUserTasks = (username) => {
  const stored = localStorage.getItem(`${username}_tasks`);
  return stored ? JSON.parse(stored) : [];
};

const saveUserTasks = (username, tasks) => {
  localStorage.setItem(`${username}_tasks`, JSON.stringify(tasks));
};

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Load tasks for logged-in user
  useEffect(() => {
    if (username) {
      const userTasks = loadUserTasks(username);
      setTasks(userTasks);
    }
  }, [username]);

  // Save tasks when they change
  useEffect(() => {
    if (username) {
      saveUserTasks(username, tasks);
    }
  }, [tasks, username]);

  // Save dark mode setting
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear active session
    setUsername(null);
    setTasks([]); // Clear current tasks in memory
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      {username ? (
        <>
          <header>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </header>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </>
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
