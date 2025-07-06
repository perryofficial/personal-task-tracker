import React from "react";

export default function TaskFilter({ currentFilter, setFilter, counts }) {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={currentFilter === filter ? "active" : ""}
        >
          {filter} ({counts[filter.toLowerCase()]})
        </button>
      ))}
    </div>
  );
}
