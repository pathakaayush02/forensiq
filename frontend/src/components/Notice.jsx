import React from 'react'

function Notice({ 
  children, 
  variant = 'info', 
  className = '' 
}) {
  const variantClasses = {
    info: 'notice-info',
    warning: 'notice-warning',
    error: 'notice-error',
    success: 'notice-success'
  }

  const classes = [
    'notice',
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Notice