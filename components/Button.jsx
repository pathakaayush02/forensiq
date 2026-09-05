import React from 'react'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  className = '', 
  ...props 
}) {
  const baseClasses = 'button'
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    success: 'button-success',
    danger: 'button-danger',
    ghost: 'button-ghost'
  }
  const sizeClasses = {
    small: 'button-sm',
    medium: '',
    large: 'button-lg'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button