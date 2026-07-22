import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch(`${API}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  async function addTodo(e) {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text })
    })
    const created = await res.json()
    setTodos((t) => [...t, created])
    setText('')
  }

  async function toggle(todo) {
    const res = await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
    const updated = await res.json()
    setTodos((t) => t.map(x => x.id === updated.id ? updated : x))
  }

  async function remove(id) {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos((t) => t.filter(x => x.id !== id))
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={addTodo} className="row">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo" />
        <button>Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo)} />
            <span>{todo.title}</span>
            <button className="delete" onClick={() => remove(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
