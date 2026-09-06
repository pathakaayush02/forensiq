import React from 'react'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'

function AuditIntegrity({ auditData = null, title = "Tamper-Evident Audit Layer", onVerify = null, verificationStatus = null, isLoading = false }) {
  // Show empty state when audit data is null or audit_events is empty
  const hasAuditEvents = auditData && auditData.audit_events && auditData.audit_events.length > 0
  
  if (!hasAuditEvents) {
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
          {onVerify && (
            <div style={{ marginTop: '1rem' }}>
              <Button 
                variant="secondary" 
                onClick={onVerify}
                disabled={isLoading}
                size="small"
              >
                {isLoading ? 'Verifying...' : 'Verify Audit'}
              </Button>
              {verificationStatus && (
                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Badge variant={verificationStatus === 'verified' ? 'success' : verificationStatus === 'error' ? 'error' : 'neutral'}>
                    {verificationStatus === 'verified' ? 'Verification Successful' : verificationStatus === 'tampered' ? 'Verification Failed' : 'Verification Error'}
                  </Badge>
                </div>
              )}
            </div>
          )}
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

  const getEventStatusVariant = (status) => {
    if (!status) return 'neutral'
    const statusMap = {
      'PROCESSING': 'info',
      'COMPLETED': 'success',
      'FAILED': 'error',
      'WARNING': 'warning'
    }
    return statusMap[status] || 'neutral'
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

  const formatEventType = (eventType) => {
    if (!eventType) return 'Unknown'
    return eventType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
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
          <div className="flex items-center gap-sm">
            {auditData.integrityStatus ? (
              <Badge variant={getIntegrityVariant(auditData.integrityStatus)}>
                {getIntegrityLabel(auditData.integrityStatus)}
              </Badge>
            ) : (
              <Badge variant="neutral">
                Not Available
              </Badge>
            )}

            {/* Verify Button - only show when not in demo mode */}
            {onVerify && (
              <Button 
                variant="secondary" 
                onClick={onVerify}
                disabled={isLoading}
                size="small"
              >
                {isLoading ? 'Verifying...' : 'Verify Audit'}
              </Button>
            )}

            {/* Verification Status */}
            {verificationStatus && (
              <Badge variant={verificationStatus === 'verified' ? 'success' : verificationStatus === 'error' ? 'error' : 'neutral'}>
                {verificationStatus === 'verified' ? 'Verification Successful' : verificationStatus === 'tampered' ? 'Verification Failed' : 'Verification Error'}
              </Badge>
            )}
          </div>
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
              {auditData.screening_id || 'Not Available'}
            </span>
          </div>

          {/* Event Count */}
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
              Total Events
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)'
            }}>
              {auditData.event_count || auditData.audit_events?.length || 0}
            </span>
          </div>

          {/* Verification Method */}
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
              Verification Method
            </span>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)'
            }}>
              {auditData.verification_method || 'Not Available'}
            </span>
          </div>
        </div>

        {/* Audit Events List */}
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <h3 style={{ 
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Audit Events ({auditData.audit_events?.length || 0})
          </h3>
          <div style={{ 
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid var(--color-border-secondary)',
            borderRadius: 'var(--radius-md)'
          }}>
            {auditData.audit_events?.map((event, index) => (
              <div 
                key={index}
                style={{ 
                  padding: 'var(--spacing-sm)',
                  borderBottom: index < auditData.audit_events.length - 1 ? '1px solid var(--color-border-secondary)' : 'none',
                  backgroundColor: index % 2 === 0 ? 'var(--color-background-secondary)' : 'transparent'
                }}
              >
                <div className="flex items-center gap-sm mb-sm">
                  <Badge variant="neutral" style={{ fontSize: 'var(--font-size-xs)' }}>
                    #{event.sequence_number}
                  </Badge>
                  <Badge variant={getEventStatusVariant(event.status)} style={{ fontSize: 'var(--font-size-xs)' }}>
                    {event.status || 'N/A'}
                  </Badge>
                  <span style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-text-primary)'
                  }}>
                    {formatEventType(event.event_type)}
                  </span>
                </div>
                
                {event.module_name && (
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    <strong>Module:</strong> {event.module_name}
                  </div>
                )}
                
                <div style={{ 
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  <strong>Timestamp:</strong> {formatTimestamp(event.timestamp)}
                </div>
                
                <div className="grid grid-cols-2 gap-sm">
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)'
                  }}>
                    <strong>Current Hash:</strong> 
                    <span style={{ fontFamily: 'monospace', marginLeft: 'var(--spacing-xs)' }}>
                      {formatHash(event.current_hash)}
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)'
                  }}>
                    <strong>Previous Hash:</strong> 
                    <span style={{ fontFamily: 'monospace', marginLeft: 'var(--spacing-xs)' }}>
                      {formatHash(event.previous_hash)}
                    </span>
                  </div>
                </div>
                
                {event.canonical_payload_hash && (
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    marginTop: 'var(--spacing-xs)'
                  }}>
                    <strong>Payload Hash:</strong> 
                    <span style={{ fontFamily: 'monospace', marginLeft: 'var(--spacing-xs)' }}>
                      {formatHash(event.canonical_payload_hash)}
                    </span>
                  </div>
                )}
              </div>
            ))}
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
            The audit trail uses SHA-256 hash chaining to provide tamper-evidence. Each event contains the hash of the previous event, creating an immutable chain. Any modification to the record would break the chain, making tampering detectable.
          </p>
        </div>

      </div>
    </Card>
  )
}

export default AuditIntegrity