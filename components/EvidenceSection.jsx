import React from 'react'
import Card from './Card'
import Badge from './Badge'

function EvidenceSection({ evidence = [], title = "Evidence Analysis" }) {
  if (!evidence || evidence.length === 0) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>No evidence data available</p>
        </div>
      </Card>
    )
  }

  const getSeverityVariant = (severity) => {
    const variantMap = {
      high: 'error',
      medium: 'warning',
      low: 'success'
    }
    return variantMap[severity] || 'neutral'
  }

  const getStatusVariant = (status) => {
    const variantMap = {
      detected: 'error',
      not_detected: 'success',
      unavailable: 'neutral'
    }
    return variantMap[status] || 'neutral'
  }

  const getCategoryLabel = (category) => {
    const labels = {
      ocr_confidence: 'OCR Confidence',
      document_completeness: 'Document Completeness',
      identifier_format: 'Identifier Format',
      date_expiry_checks: 'Date/Expiry Checks',
      layout_consistency: 'Layout Consistency',
      qr_consistency: 'QR Consistency',
      mrz_consistency: 'MRZ Consistency',
      tampering_indicators: 'Tampering Indicators',
      image_quality: 'Image Quality',
      face_similarity: 'Face Similarity',
      cross_document_consistency: 'Cross-Document Consistency',
      metadata_stamp_anomalies: 'Metadata/Stamp Anomalies'
    }
    return labels[category] || category || 'General'
  }

  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-md">
        {evidence.map((item, index) => (
          <div 
            key={index}
            style={{ 
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-background-tertiary)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${item.severity === 'high' ? 'var(--color-error)' : 
                                  item.severity === 'medium' ? 'var(--color-warning)' : 
                                  'var(--color-success)'}`
            }}
          >
            {/* Header with module name and badges */}
            <div className="flex items-center gap-sm mb-sm" style={{ flexWrap: 'wrap' }}>
              {item.moduleName && (
                <Badge variant="info" style={{ fontSize: 'var(--font-size-xs)' }}>
                  {item.moduleName}
                </Badge>
              )}
              {item.category && (
                <Badge variant="neutral" style={{ fontSize: 'var(--font-size-xs)' }}>
                  {getCategoryLabel(item.category)}
                </Badge>
              )}
              {item.status && (
                <Badge variant={getStatusVariant(item.status)} style={{ fontSize: 'var(--font-size-xs)' }}>
                  {item.status === 'detected' ? 'Detected' : 
                   item.status === 'not_detected' ? 'Not Detected' : 
                   item.status === 'unavailable' ? 'Not Available' : item.status}
                </Badge>
              )}
              {item.severity && (
                <Badge variant={getSeverityVariant(item.severity)} style={{ fontSize: 'var(--font-size-xs)' }}>
                  {item.severity.toUpperCase()}
                </Badge>
              )}
            </div>

            {/* Description */}
            {item.description ? (
              <p style={{ 
                margin: '0 0 var(--spacing-sm) 0',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-sm)'
              }}>
                {item.description}
              </p>
            ) : (
              <p style={{ 
                margin: '0 0 var(--spacing-sm) 0',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-sm)',
                fontStyle: 'italic'
              }}>
                No description available
              </p>
            )}

            {/* Supporting value */}
            {item.value !== null && item.value !== undefined ? (
              <div style={{ 
                marginTop: 'var(--spacing-sm)',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                <strong>Value:</strong> {typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value)}
              </div>
            ) : (
              <div style={{ 
                marginTop: 'var(--spacing-sm)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic'
              }}>
                Value not available
              </div>
            )}

            {/* Location info if available */}
            {item.location && (
              <div style={{ 
                marginTop: 'var(--spacing-xs)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)'
              }}>
                <strong>Location:</strong> {item.location}
              </div>
            )}

            {/* Confidence if available */}
            {item.confidence !== null && item.confidence !== undefined && (
              <div style={{ 
                marginTop: 'var(--spacing-xs)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)'
              }}>
                <strong>Confidence:</strong> {typeof item.confidence === 'number' ? `${item.confidence}%` : item.confidence}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default EvidenceSection