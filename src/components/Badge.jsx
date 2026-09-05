import React from 'react'

function Badge({ 
  children, 
  variant = 'neutral', 
  className = '' 
}) {
  const variantClasses = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    neutral: 'badge-neutral'
  }

  const classes = [
    'badge',
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge