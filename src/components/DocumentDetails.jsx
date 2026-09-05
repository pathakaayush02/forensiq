import React from 'react'
import Card from './Card'
import Badge from './Badge'

function DocumentDetails({ documentDetails = null, title = "Document & OCR Details" }) {
  if (!documentDetails) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>Document details not available</p>
        </div>
      </Card>
    )
  }

  const { identity, document, mrz, qr } = documentDetails

  const renderValue = (value, label) => {
    if (value === null || value === undefined || value === '') {
      return <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Not Available</span>
    }
    return <span style={{ color: 'var(--color-text-primary)' }}>{value}</span>
  }

  const getStatusBadge = (status) => {
    if (!status) return null
    const variantMap = {
      valid: 'success',
      invalid: 'error',
      consistent: 'success',
      inconsistent: 'error',
      readable: 'success',
      not_readable: 'error',
      not_available: 'neutral',
      related: 'success',
      unrelated: 'warning'
    }
    const variant = variantMap[status] || 'neutral'
    return (
      <Badge variant={variant} style={{ fontSize: 'var(--font-size-xs)' }}>
        {status.replace(/_/g, ' ').toUpperCase()}
      </Badge>
    )
  }

  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-lg">
        
        {/* Identity Section */}
        <div>
          <h4 style={{ 
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Identity Information
          </h4>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Name
              </label>
              {renderValue(identity?.name)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Date of Birth
              </label>
              {renderValue(identity?.dateOfBirth)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Nationality
              </label>
              {renderValue(identity?.nationality)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Gender
              </label>
              {renderValue(identity?.gender)}
            </div>
          </div>
        </div>

        {/* Document Section */}
        <div>
          <h4 style={{ 
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Document Information
          </h4>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Document Number
              </label>
              {renderValue(document?.number)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Document Type
              </label>
              {renderValue(document?.type)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Issue Date
              </label>
              {renderValue(document?.issueDate)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Expiry Date
              </label>
              {renderValue(document?.expiryDate)}
            </div>
          </div>
        </div>

        {/* MRZ Section */}
        <div>
          <h4 style={{ 
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Machine-Readable Zone (MRZ)
          </h4>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                MRZ Status
              </label>
              {mrz?.status ? getStatusBadge(mrz.status) : renderValue(null)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                OCR/MRZ Consistency
              </label>
              {mrz?.ocrMrzConsistency ? getStatusBadge(mrz.ocrMrzConsistency) : renderValue(null)}
            </div>
          </div>
          {mrz?.extractedData && (
            <div style={{ 
              marginTop: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm)',
              backgroundColor: 'var(--color-background-tertiary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)'
            }}>
              <strong>Extracted MRZ Data:</strong>
              <pre style={{ 
                margin: 'var(--spacing-xs) 0 0 0',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                {typeof mrz.extractedData === 'object' ? JSON.stringify(mrz.extractedData, null, 2) : mrz.extractedData}
              </pre>
            </div>
          )}
        </div>

        {/* QR Section */}
        <div>
          <h4 style={{ 
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            QR Code Information
          </h4>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                QR Readability
              </label>
              {qr?.readability ? getStatusBadge(qr.readability) : renderValue(null)}
            </div>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                QR Consistency
              </label>
              {qr?.consistency ? getStatusBadge(qr.consistency) : renderValue(null)}
            </div>
          </div>
          {qr?.extractedData && (
            <div style={{ 
              marginTop: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm)',
              backgroundColor: 'var(--color-background-tertiary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)'
            }}>
              <strong>Extracted QR Data:</strong>
              <pre style={{ 
                margin: 'var(--spacing-xs) 0 0 0',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                {typeof qr.extractedData === 'object' ? JSON.stringify(qr.extractedData, null, 2) : qr.extractedData}
              </pre>
            </div>
          )}
        </div>

      </div>
    </Card>
  )
}

export default DocumentDetails