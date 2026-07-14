import React from 'react'
import Button from './Button'

export default function Header({ theme, onToggleTheme }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Tasks</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Stay focused and get things done</p>
      </div>
      <Button
        onClick={onToggleTheme}
        ariaLabel="Toggle theme"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
      >
        {theme === 'dark' ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            Light
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            Dark
          </>
        )}
      </Button>
    </div>
  )
}
