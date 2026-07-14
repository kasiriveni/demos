import React from 'react'

export default function InputForm({ text, setText, onAdd }) {
  return (
    <form onSubmit={onAdd} className="input-form animate-slide-up">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New todo"
      />
      <button type="submit">Add task</button>
    </form>
  )
}
