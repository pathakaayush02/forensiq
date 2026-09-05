import React from 'react'
import Card from './Card'
import Badge from './Badge'

function CrossDocumentConsistency({ crossDocumentConsistency = null, title = "Cross-Document Consistency" }) {
  if (!crossDocumentConsistency) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>Cross-document consistency data not available</p>
        </div>
      </Card>
    )
  }

  const getConsistencyVariant = (status) => {
    const variantMap = {
      consistent: 'success',
      inconsistent: 'error',
      not_available: 'neutral',
      related: 'success',
      unrelated: 'warning'
    }
    return variantMap[status] || 'neutral'
  }

  const getConsistencyLabel = (status) => {
    const labels = {
      consistent: 'Consistent',
      inconsistent: 'Inconsistent',
      not_available: 'Not Available',
      related: 'Related',
      unrelated: 'Unrelated'
    }
    return labels[status] || status || 'Unknown'
  }

  const consistencyChecks = [
    {
      label: 'Name Consistency',
      value: crossDocumentConsistency.nameConsistency,
      description: 'Name matches across all documents'
    },
    {
      label: 'Date of Birth Consistency',
      value: crossDocumentConsistency.dobConsistency,
      description: 'Date of birth matches across all documents'
    },
    {
      label: 'Nationality Consistency',
      value: crossDocumentConsistency.nationalityConsistency,
      description: 'Nationality information is consistent'
    },
    {
      label: 'Validity Consistency',
      value: crossDocumentConsistency.validityConsistency,
      description: 'Document validity periods are consistent'
    },
    {
      label: 'Document Relationship',
      value: crossDocumentConsistency.documentRelationship,
      description: 'Relationship between multiple documents'
    }
  ]

  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-md">
        
        {/* Consistency Checks */}
        {consistencyChecks.map((check, index) => (
          <div 
            key={index}
            style={{ 
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-background-tertiary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--spacing-sm)'
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {check.label}
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)'
              }}>
                {check.description}
              </div>
            </div>
            {check.value ? (
              <Badge variant={getConsistencyVariant(check.value)}>
                {getConsistencyLabel(check.value)}
              </Badge>
            ) : (
              <Badge variant="neutral">
                Not Available
              </Badge>
            )}
          </div>
        ))}

        {/* Overall Explanation */}
        {crossDocumentConsistency.explanation && (
          <div style={{ 
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            borderLeft: '3px solid var(--color-info)'
          }}>
            <strong>Analysis Summary:</strong>
            <p style={{ margin: 'var(--spacing-xs) 0 0 0' }}>
              {crossDocumentConsistency.explanation}
            </p>
          </div>
        )}

        {/* Summary Statistics */}
        <div style={{ 
          marginTop: 'var(--spacing-sm)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-md)'
        }}>
          <h5 style={{ 
            fontSize: 'var(--font-size-xs)', 
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--spacing-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Consistency Summary
          </h5>
          <div className="grid grid-cols-3 gap-sm">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-success)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {
                  consistencyChecks.filter(check => check.value === 'consistent' || check.value === 'related').length
                }
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Consistent
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-error)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {
                  consistencyChecks.filter(check => check.value === 'inconsistent' || check.value === 'unrelated').length
                }
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Inconsistent
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {
                  consistencyChecks.filter(check => !check.value || check.value === 'not_available').length
                }
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Unavailable
              </div>
            </div>
          </div>
        </div>

      </div>
    </Card>
  )
}

export default CrossDocumentConsistency