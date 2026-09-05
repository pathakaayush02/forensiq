import React, { useState, useRef, useEffect } from 'react'
import Button from './Button'
import Badge from './Badge'
import Notice from './Notice'

function FileUpload({ 
  label, 
  description, 
  accept = 'image/*', 
  onChange, 
  selectedFile,
  onRemove,
  required = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = '' 
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Clean up preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Create preview for image files
  useEffect(() => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile])

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
      setError(`File size exceeds ${maxSizeMB}MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`)
      return false
    }

    // Check file type if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1))
        }
        return file.type === type || file.name.endsWith(type.replace('.', ''))
      })
      
      if (!isAccepted) {
        setError(`File type not accepted. Accepted types: ${accept}`)
        return false
      }
    }

    setError(null)
    return true
  }

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
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onChange(file)
      }
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onChange(file)
      }
    }
    // Reset input so same file can be selected again if needed
    e.target.value = ''
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
    setError(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleReplace = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${error ? 'file-upload-error' : ''} ${className}`} role="region" aria-label={`${label} upload area`}>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="file-input"
        id={`file-upload-${label}`}
        ref={fileInputRef}
        disabled={isUploading}
      />
      
      {!selectedFile ? (
        // Empty state
        <label htmlFor={`file-upload-${label}`} style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}>
          <div className="flex items-center gap-sm mb-xs">
            <h3 style={{ marginBottom: '0', color: 'var(--color-text-primary)' }}>
              {label}
            </h3>
            {required && <Badge variant="error">Required</Badge>}
            {!required && <Badge variant="neutral">Optional</Badge>}
          </div>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            {description}
          </p>
          <div className="flex gap-sm">
            <Button variant="secondary" size="small" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Select File'}
            </Button>
          </div>
          {error && (
            <Notice variant="error" className="mt-sm">
              {error}
            </Notice>
          )}
        </label>
      ) : (
        // File selected state
        <div>
          <div className="flex items-center justify-between mb-md">
            <div className="flex items-center gap-sm">
              <h3 style={{ marginBottom: '0', color: 'var(--color-text-primary)' }}>
                {label}
              </h3>
              {required && <Badge variant="error">Required</Badge>}
              {!required && <Badge variant="neutral">Optional</Badge>}
            </div>
            <div className="flex gap-sm">
              <Button 
                variant="ghost" 
                size="small" 
                onClick={handleReplace}
                disabled={isUploading}
              >
                Replace
              </Button>
              <Button 
                variant="danger" 
                size="small" 
                onClick={handleRemove}
                disabled={isUploading}
              >
                Remove
              </Button>
            </div>
          </div>

          {/* File preview and info */}
          <div className="flex gap-md items-start">
            {previewUrl && (
              <div className="file-preview">
                <img 
                  src={previewUrl} 
                  alt={`Preview of ${selectedFile.name}`} 
                  style={{ 
                    maxWidth: '120px', 
                    maxHeight: '120px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-secondary)',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="file-info">
                <p style={{ 
                  color: 'var(--color-text-primary)', 
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '0.25rem'
                }}>
                  {selectedFile.name}
                </p>
                <p style={{ 
                  color: 'var(--color-text-muted)', 
                  fontSize: 'var(--font-size-sm)',
                  marginBottom: '0.5rem'
                }}>
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                </p>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="upload-progress">
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: 'var(--color-background-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ 
                      width: `${uploadProgress}%`, 
                      height: '100%', 
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: 'var(--font-size-sm)' 
                  }}>
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {error && (
                <Notice variant="error" className="mt-sm">
                  {error}
                </Notice>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload