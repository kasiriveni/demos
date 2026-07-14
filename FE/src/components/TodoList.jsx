import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="p-10 text-center animate-fade-in" style={{ color: 'var(--muted)' }}>
          <svg className="mx-auto mb-3 opacity-30" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          <div className="text-sm">No tasks yet — add one above</div>
        </li>
      ) : (
        todos.map(t => (
          <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </ul>
  )
}
