import React from 'react'

function Status({ 
  children, 
  variant = 'loading', 
  className = '' 
}) {
  const variantClasses = {
    healthy: 'status-healthy',
    error: 'status-error',
    loading: 'status-loading'
  }

  const classes = [
    'status',
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Status