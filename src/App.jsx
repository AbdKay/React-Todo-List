import React, { useEffect, useMemo, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'

const STORAGE_KEY = 'react-todo-list:v1'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setTodos(parsed)
      }
    } catch (e) {
      console.error('Failed to parse localStorage todos', e)
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (data) => {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now() + Math.random())
    setTodos(prev => [
      ...prev,
      {
        id,
        text: data.text.trim(),
        completed: false,
        priority: data.priority || 'medium', // 'low' | 'medium' | 'high'
        dueDate: data.dueDate || '', // 'YYYY-MM-DD'
        createdAt: new Date().toISOString(),
      }
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.length - activeCount

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Todo List</h1>
        <p className="subtitle">React + Hooks • localStorage • Filters • Priority • Due Dates</p>
      </header>

      <main className="container">
        <section className="card">
          <TodoForm onAdd={addTodo} />
        </section>

        <section className="controls card">
          <div className="filters" role="tablist" aria-label="Task filters">
            <button
              className={filter === 'all' ? 'chip chip-active' : 'chip'}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              All ({todos.length})
            </button>
            <button
              className={filter === 'active' ? 'chip chip-active' : 'chip'}
              onClick={() => setFilter('active')}
              role="tab"
              aria-selected={filter === 'active'}
            >
              Active ({activeCount})
            </button>
            <button
              className={filter === 'completed' ? 'chip chip-active' : 'chip'}
              onClick={() => setFilter('completed')}
              role="tab"
              aria-selected={filter === 'completed'}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="control-actions">
            <button className="btn btn-secondary" onClick={clearCompleted} disabled={completedCount === 0}>
              Clear Completed
            </button>
          </div>
        </section>

        <section className="card">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </section>
      </main>

      <footer className="footer">
        <p>Built with ❤️ using React functional components & hooks.</p>
      </footer>
    </div>
  )
}
