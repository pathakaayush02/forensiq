import React, { useState } from 'react'
import Button from './Button'

function FileUpload({ 
  label, 
  description, 
  accept = 'image/*', 
  onChange, 
  selectedFile,
  className = '' 
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  return (
    <div className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${className}`}>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="file-input"
        id={`file-upload-${label}`}
      />
      <label htmlFor={`file-upload-${label}`} style={{ cursor: 'pointer' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          {label}
        </h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          {description}
        </p>
        <Button variant="secondary" size="small">
          {selectedFile ? 'Change File' : 'Select File'}
        </Button>
        {selectedFile && (
          <p style={{ marginTop: '1rem', color: 'var(--color-success)' }}>
            Selected: {selectedFile.name}
          </p>
        )}
      </label>
    </div>
  )
}

export default FileUpload