import React from 'react'

export default function Footer({ count, onClearAll }) {
  return (
    <div className="footer">
      <span>{count} {count === 1 ? 'task' : 'tasks'}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={onClearAll}
          disabled={count === 0}
        >
          Clear all
        </button>
        <span className="text-xs" style={{ color: 'var(--muted)', opacity: 0.5 }}>Made with ♥</span>
      </div>
    </div>
  )
}
