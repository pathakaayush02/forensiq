import React from 'react'

function Card({ 
  children, 
  className = '', 
  title, 
  header, 
  footer 
}) {
  return (
    <div className={`card ${className}`}>
      {(title || header) && (
        <div className="card-header">
          {title ? <h3 className="card-title">{title}</h3> : header}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card