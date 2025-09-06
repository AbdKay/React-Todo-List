import React, { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd({ text, priority, dueDate })
    setText('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Create a new task">
      <div className="grid grid-3">
        <div className="field">
          <label htmlFor="title">Task</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Finish React Todo app"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-required="true"
          />
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn" type="submit">Add Task</button>
      </div>
    </form>
  )
}
