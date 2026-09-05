import React from 'react'
import Card from './Card'
import Badge from './Badge'

function AuditIntegrity({ auditData = null, title = "Tamper-Evident Audit Layer" }) {
  if (!auditData || !auditData.available) {
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
            🔐
          </div>
          <p style={{ marginBottom: 'var(--spacing-sm)' }}>Audit record not yet generated</p>
          <p style={{ fontSize: 'var(--font-size-sm)' }}>
            The tamper-evident audit record will be available when the screening process is complete.
          </p>
        </div>
      </Card>
    )
  }

  const getIntegrityVariant = (status) => {
    const variantMap = {
      verified: 'success',
      tampered: 'error',
      not_available: 'neutral'
    }
    return variantMap[status] || 'neutral'
  }

  const getIntegrityLabel = (status) => {
    const labels = {
      verified: 'Verified',
      tampered: 'Tampered',
      not_available: 'Not Available'
    }
    return labels[status] || status || 'Unknown'
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Not Available'
    try {
      const date = new Date(timestamp)
      return date.toLocaleString()
    } catch (e) {
      return timestamp
    }
  }

  const formatHash = (hash) => {
    if (!hash) return 'Not Available'
    if (typeof hash !== 'string') return 'Invalid Format'
    if (hash.length > 16) {
      return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`
    }
    return hash
  }

  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-md">
        
        {/* Disclaimer */}
        <div style={{ 
          padding: 'var(--spacing-sm)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          borderLeft: '3px solid var(--color-info)'
        }}>
          <strong>Note:</strong> This is a tamper-evident audit layer for screening record integrity. 
          This does not constitute a blockchain implementation.
        </div>

        {/* Integrity Status */}
        <div style={{ 
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--spacing-sm)'
        }}>
          <div>
            <div style={{ 
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-xs)'
            }}>
              Record Integrity Status
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)'
            }}>
              Current audit record verification state
            </div>
          </div>
          {auditData.integrityStatus ? (
            <Badge variant={getIntegrityVariant(auditData.integrityStatus)}>
              {getIntegrityLabel(auditData.integrityStatus)}
            </Badge>
          ) : (
            <Badge variant="neutral">
              Not Available
            </Badge>
          )}
        </div>

        {/* Audit Details */}
        <div className="grid grid-cols-1 gap-sm">
          {/* Screening ID */}
          <div style={{ 
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-xs)'
          }}>
            <span style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Screening ID
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
              fontFamily: 'monospace'
            }}>
              {auditData.screeningId || 'Not Available'}
            </span>
          </div>

          {/* Timestamp */}
          <div style={{ 
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-xs)'
          }}>
            <span style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Audit Timestamp
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)'
            }}>
              {formatTimestamp(auditData.timestamp)}
            </span>
          </div>

          {/* Record Hash */}
          <div style={{ 
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-xs)'
          }}>
            <span style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Record Hash
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
              fontFamily: 'monospace'
            }}>
              {formatHash(auditData.recordHash)}
            </span>
          </div>

          {/* Previous Hash */}
          <div style={{ 
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-xs)'
          }}>
            <span style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Previous Hash
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
              fontFamily: 'monospace'
            }}>
              {formatHash(auditData.previousHash)}
            </span>
          </div>
        </div>

        {/* Hash Verification Info */}
        <div style={{ 
          marginTop: 'var(--spacing-sm)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)'
        }}>
          <strong>Hash Information:</strong>
          <p style={{ margin: 'var(--spacing-xs) 0 0 0' }}>
            The record hash provides tamper-evidence by cryptographically binding the screening data. 
            Any modification to the record would result in a different hash value, making tampering detectable.
          </p>
        </div>

      </div>
    </Card>
  )
}

export default AuditIntegrity