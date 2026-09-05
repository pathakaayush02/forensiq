import React from 'react'
import Notice from './Notice'

function DemoModeIndicator({ message = "This uses synthetic demo data for demonstration purposes only." }) {
  return (
    <Notice variant="warning" style={{ marginBottom: '2rem' }}>
      <div className="flex items-center gap-sm" style={{ flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        <div>
          <strong>DEMO MODE - SYNTHETIC DATA</strong>
          <p style={{ margin: 'var(--spacing-xs) 0 0 0', fontSize: 'var(--font-size-sm)' }}>
            {message}
          </p>
        </div>
      </div>
    </Notice>
  )
}

export default DemoModeIndicator