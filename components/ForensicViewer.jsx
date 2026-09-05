import React, { useState } from 'react'
import Card from './Card'
import Badge from './Badge'

function ForensicViewer({ forensicData = null, title = "Forensic Analysis Viewer" }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showOverlay, setShowOverlay] = useState(true)

  if (!forensicData || !forensicData.available) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: 'var(--color-text-muted)'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            opacity: 0.5
          }}>
            🔍
          </div>
          <p style={{ marginBottom: 'var(--spacing-sm)' }}>Forensic visualization unavailable</p>
          <p style={{ fontSize: 'var(--font-size-sm)' }}>
            No forensic image data or analysis results provided for this screening.
          </p>
        </div>
      </Card>
    )
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    const startX = e.clientX - pan.x
    const startY = e.clientY - pan.y

    const handleMouseMove = (moveEvent) => {
      setPan({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const viewerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundColor: 'var(--color-background-secondary)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    cursor: zoom > 1 ? 'grab' : 'default',
    border: '1px solid var(--color-border)'
  }

  const imageContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
    transition: 'transform 0.1s ease-out',
    transformOrigin: 'center center'
  }

  const baseImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    borderRadius: 'var(--radius-sm)'
  }

  const overlayImageStyle = {
    ...baseImageStyle,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: showOverlay ? 0.7 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  }

  return (
    <Card title={title}>
      {/* Controls */}
      <div className="flex items-center gap-sm mb-md" style={{ flexWrap: 'wrap' }}>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          style={{
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            fontSize: 'var(--font-size-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: zoom > 0.5 ? 'pointer' : 'not-allowed',
            opacity: zoom > 0.5 ? 1 : 0.5
          }}
        >
          Zoom Out
        </button>
        <span style={{ 
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          minWidth: '60px',
          textAlign: 'center'
        }}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          style={{
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            fontSize: 'var(--font-size-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: zoom < 3 ? 'pointer' : 'not-allowed',
            opacity: zoom < 3 ? 1 : 0.5
          }}
        >
          Zoom In
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            fontSize: 'var(--font-size-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        {forensicData.overlayImageUrl && (
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            style={{
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: 'var(--font-size-sm)',
              backgroundColor: showOverlay ? 'var(--color-primary)' : 'var(--color-background-secondary)',
              color: showOverlay ? 'white' : 'var(--color-text-primary)',
              border: showOverlay ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
          </button>
        )}
        <div style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
          {zoom > 1 ? 'Drag to pan' : 'Use controls to zoom'}
        </div>
      </div>

      {/* Image Viewer */}
      <div 
        style={viewerStyle}
        onMouseDown={zoom > 1 ? handleMouseDown : undefined}
      >
        <div style={imageContainerStyle}>
          {/* Original Document Image */}
          {forensicData.originalImageUrl ? (
            <img 
              src={forensicData.originalImageUrl} 
              alt="Original document"
              style={baseImageStyle}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div style={{
              ...baseImageStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-background-tertiary)',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)'
            }}>
              Original image not available
            </div>
          )}

          {/* Overlay Image (suspicious regions, markers, etc.) */}
          {forensicData.overlayImageUrl && (
            <img 
              src={forensicData.overlayImageUrl} 
              alt="Analysis overlay"
              style={overlayImageStyle}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}

          {/* Markers */}
          {forensicData.markers && forensicData.markers.length > 0 && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {forensicData.markers.map((marker, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${marker.x}%`,
                    top: `${marker.y}%`,
                    width: `${marker.width || 20}px`,
                    height: `${marker.height || 20}px`,
                    border: `2px solid ${marker.color || 'var(--color-error)'}`,
                    backgroundColor: `${marker.color || 'var(--color-error)'}33`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  title={marker.label || marker.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      {forensicData.explanation && (
        <div style={{ 
          marginTop: 'var(--spacing-md)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          <strong>Analysis Explanation:</strong>
          <p style={{ margin: 'var(--spacing-xs) 0 0 0' }}>
            {forensicData.explanation}
          </p>
        </div>
      )}

      {/* Markers Legend */}
      {forensicData.markers && forensicData.markers.length > 0 && (
        <div style={{ marginTop: 'var(--spacing-sm)' }}>
          <h5 style={{ 
            fontSize: 'var(--font-size-xs)', 
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--spacing-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Markers
          </h5>
          <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
            {forensicData.markers.map((marker, index) => (
              <Badge 
                key={index} 
                variant="neutral"
                style={{ 
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: `${marker.color || 'var(--color-error)'}22`,
                  border: `1px solid ${marker.color || 'var(--color-error)'}`
                }}
              >
                {marker.label || `Marker ${index + 1}`}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default ForensicViewer