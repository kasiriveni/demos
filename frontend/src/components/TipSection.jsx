import React from 'react'

export default function TipSection({ tip, onGetTip }) {
  return (
    <div className="ai-tip">
      <button onClick={onGetTip}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Get productivity tip
        </span>
      </button>
      {tip && (
        <div className="tip animate-fade-in">
          <div className="text-xs font-semibold mb-1.5" style={{ color: 'var(--accent)' }}>Tip</div>
          <div>{tip.tip}</div>
        </div>
      )}
    </div>
  )
}
