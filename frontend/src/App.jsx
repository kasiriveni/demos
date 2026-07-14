import React, { useState, useEffect } from 'react'
import * as api from './api'
import Header from './components/Header'
import InputForm from './components/InputForm'
import TodoList from './components/TodoList'
import TipSection from './components/TipSection'
import Footer from './components/Footer'

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tip, setTip] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.fetchTodos()
      .then(data => {
        if (cancelled) return
        // map backend { id, title, completed } -> { id, text, done }
        setTodos(Array.isArray(data) ? data.map(t => ({ id: t.id, text: t.title || '', done: !!t.completed })) : [])
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  // sync state with backend when local changes are made via actions below

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    } catch (e) { /* ignore in non-browser envs */ }
  }, [theme])

  function addTodo(e) {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    api.createTodo({ title: text.trim() })
      .then(created => {
        setTodos(t => [{ id: created.id, text: created.title, done: !!created.completed }, ...t])
        setText('')
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function toggle(id) {
    const existing = todos.find(t => t.id === id)
    if (!existing) return
    setLoading(true)
    setError(null)
    api.updateTodo(id, { completed: !existing.done })
      .then(updated => {
        setTodos(t => t.map(x => x.id === id ? { id: updated.id, text: updated.title, done: !!updated.completed } : x))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function del(id) {
    setLoading(true)
    setError(null)
    api.deleteTodo(id)
      .then(() => setTodos(t => t.filter(x => x.id !== id)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function toggleTheme() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  async function getRandomTip() {
    setLoading(true)
    setError(null)
    try {
      const t = await api.fetchRandomTip()
      setTip(t)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function clearAll() {
    if (!todos.length) return
    setLoading(true)
    setError(null)
    try {
      await Promise.all(todos.map(t => api.deleteTodo(t.id)))
      setTodos([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="app animate-fade-in">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <InputForm text={text} setText={setText} onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggle} onDelete={del} />
        <TipSection tip={tip} onGetTip={getRandomTip} />
        {loading && (
          <div className="status">Loading...</div>
        )}
        {error && (
          <div className="status error">{error}</div>
        )}
        <Footer count={todos.length} onClearAll={clearAll} />
      </div>
    </div>
  )
}
