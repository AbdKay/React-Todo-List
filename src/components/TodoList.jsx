import React from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) {
    return (
      <div className="empty">
        <p>No tasks yet. Add your first one above ✨</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(updates) => onEdit(todo.id, updates)}
        />
      ))}
    </ul>
  )
}
