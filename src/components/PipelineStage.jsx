import React from 'react'
import Badge from './Badge'

function PipelineStage({ 
  stage, 
  status = 'pending', 
  title, 
  description, 
  progress = 0,
  error = null 
}) {
  const getBadgeVariant = (status) => {
    const variantMap = {
      pending: 'neutral',
      processing: 'info',
      completed: 'success',
      warning: 'warning',
      failed: 'error',
      not_available: 'neutral' // Use neutral style for unavailable modules
    }
    return variantMap[status] || 'neutral'
  }

  const statusConfig = {
    pending: {
      icon: '○',
      color: 'var(--color-text-muted)',
      bgColor: 'var(--color-background-tertiary)',
      borderColor: 'var(--color-border-secondary)',
      label: 'Pending'
    },
    processing: {
      icon: '◐',
      color: 'var(--color-info)',
      bgColor: 'var(--color-info-bg)',
      borderColor: 'var(--color-info)',
      label: 'Processing'
    },
    completed: {
      icon: '✓',
      color: 'var(--color-success)',
      bgColor: 'var(--color-success-bg)',
      borderColor: 'var(--color-success)',
      label: 'Completed'
    },
    warning: {
      icon: '⚠',
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning-bg)',
      borderColor: 'var(--color-warning)',
      label: 'Warning'
    },
    failed: {
      icon: '✕',
      color: 'var(--color-error)',
      bgColor: 'var(--color-error-bg)',
      borderColor: 'var(--color-error)',
      label: 'Failed'
    },
    not_available: {
      icon: '—',
      color: 'var(--color-text-muted)',
      bgColor: 'var(--color-background-secondary)',
      borderColor: 'var(--color-border-secondary)',
      label: 'Not Available'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div 
      className="pipeline-stage"
      style={{
        border: `1px solid ${config.borderColor}`,
        backgroundColor: config.bgColor,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-md)',
        transition: 'all var(--transition-base)'
      }}
    >
      <div className="flex items-start gap-md">
        {/* Status Icon */}
        <div 
          className="pipeline-stage-icon"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: config.borderColor,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            flexShrink: 0,
            animation: status === 'processing' ? 'pulse 1.5s infinite' : 'none'
          }}
        >
          {config.icon}
        </div>

        {/* Stage Content */}
        <div className="flex-1">
          <div className="flex items-center gap-sm mb-sm">
            <h4 style={{ 
              margin: 0, 
              color: config.color,
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              {stage}. {title}
            </h4>
            <Badge variant={getBadgeVariant(status)}>
              {config.label}
            </Badge>
          </div>

          {description && (
            <p style={{ 
              margin: '0 0 var(--spacing-sm) 0',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)'
            }}>
              {description}
            </p>
          )}

          {/* Progress Bar for Processing State */}
          {status === 'processing' && progress > 0 && (
            <div style={{ marginTop: 'var(--spacing-sm)' }}>
              <div style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: 'var(--color-background-input)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.25rem'
              }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  backgroundColor: config.color,
                  borderRadius: 'var(--radius-sm)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <p style={{ 
                margin: 0,
                color: 'var(--color-text-muted)', 
                fontSize: 'var(--font-size-xs)' 
              }}>
                {progress}% complete
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{ 
              marginTop: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)'
            }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PipelineStage