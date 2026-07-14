import React from 'react'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''} animate-fade-in`}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button onClick={() => onDelete(todo.id)} className="delete" aria-label="Delete todo">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13"/>
        </svg>
      </button>
    </li>
  )
}
