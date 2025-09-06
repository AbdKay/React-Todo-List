import React, { useMemo, useState } from 'react'

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false
  try {
    const today = new Date()
    const d = new Date(dueDate + 'T23:59:59')
    return d < today
  } catch {
    return false
  }
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(todo.text)
  const [draftPriority, setDraftPriority] = useState(todo.priority || 'medium')
  const [draftDueDate, setDraftDueDate] = useState(todo.dueDate || '')

  const overdue = useMemo(() => isOverdue(todo.dueDate, todo.completed), [todo.dueDate, todo.completed])

  const handleSave = () => {
    const payload = {
      text: draftText.trim() || todo.text,
      priority: draftPriority,
      dueDate: draftDueDate,
    }
    onEdit(payload)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraftText(todo.text)
    setDraftPriority(todo.priority || 'medium')
    setDraftDueDate(todo.dueDate || '')
    setIsEditing(false)
  }

  return (
    <li className={['todo-item', todo.completed ? 'completed' : '', overdue ? 'overdue' : ''].filter(Boolean).join(' ')}>
      <div className="item-left">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={onToggle}
          aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}
        />
      </div>

      <div className="item-main">
        {isEditing ? (
          <div className="edit-grid">
            <input
              className="edit-title"
              type="text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              autoFocus
            />
            <select
              className="edit-priority"
              value={draftPriority}
              onChange={(e) => setDraftPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              className="edit-date"
              type="date"
              value={draftDueDate}
              onChange={(e) => setDraftDueDate(e.target.value)}
            />
          </div>
        ) : (
          <div className="display">
            <span className="title">{todo.text}</span>
            <div className="meta">
              <span className={['badge', `priority-${todo.priority || 'medium'}`].join(' ')}>
                {String(todo.priority || 'medium').replace(/^./, c => c.toUpperCase())}
              </span>
              {todo.dueDate && (
                <span className="due">
                  Due: {todo.dueDate}
                </span>
              )}
              {overdue && <span className="overdue-label">Overdue</span>}
            </div>
          </div>
        )}
      </div>

      <div className="item-actions">
        {isEditing ? (
          <>
            <button className="btn btn-small" onClick={handleSave} aria-label="Save edits">Save</button>
            <button className="btn btn-small btn-secondary" onClick={handleCancel} aria-label="Cancel edits">Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-small" onClick={() => setIsEditing(true)} aria-label="Edit task">Edit</button>
            <button className="btn btn-small btn-danger" onClick={onDelete} aria-label="Delete task">Delete</button>
          </>
        )}
      </div>
    </li>
  )
}
