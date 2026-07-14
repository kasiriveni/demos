import React from 'react'

export default function Button({ children, onClick, className = '', ariaLabel, ...props }) {
  const base = 'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors'

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${className}`}
      style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'transparent' }}
      {...props}
    >
      {children}
    </button>
  )
}
