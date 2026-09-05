import React from 'react'
import Card from './Card'
import Badge from './Badge'

function FaceComparison({ faceComparison = null, title = "Face Similarity Assessment" }) {
  if (!faceComparison || !faceComparison.available) {
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
            👤
          </div>
          <p style={{ marginBottom: 'var(--spacing-sm)' }}>Face comparison unavailable</p>
          <p style={{ fontSize: 'var(--font-size-sm)' }}>
            No face comparison data provided for this screening.
          </p>
        </div>
      </Card>
    )
  }

  const getMatchVariant = (matchResult) => {
    const variantMap = {
      match: 'success',
      no_match: 'error',
      unavailable: 'neutral'
    }
    return variantMap[matchResult] || 'neutral'
  }

  const getSimilarityColor = (score) => {
    if (score === null) return 'var(--color-text-muted)'
    if (score >= 80) return 'var(--color-success)'
    if (score >= 60) return 'var(--color-warning)'
    return 'var(--color-error)'
  }

  const getMatchLabel = (matchResult) => {
    const labels = {
      match: 'Match',
      no_match: 'No Match',
      unavailable: 'Unavailable'
    }
    return labels[matchResult] || 'Unknown'
  }

  return (
    <Card title={title}>
      <div className="grid grid-cols-1 gap-lg">
        
        {/* Disclaimer */}
        <div style={{ 
          padding: 'var(--spacing-sm)',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          borderLeft: '3px solid var(--color-info)'
        }}>
          <strong>Note:</strong> This is a face similarity assessment for document screening purposes. 
          This does not constitute legal identity verification.
        </div>

        {/* Images Comparison */}
        <div className="grid grid-cols-2 gap-md">
          {/* Document Photo */}
          <div>
            <h4 style={{ 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              Document Photo
            </h4>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid var(--color-border)'
            }}>
              {faceComparison.documentPhotoUrl ? (
                <img 
                  src={faceComparison.documentPhotoUrl} 
                  alt="Document photo"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = '<span style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Image unavailable</span>'
                  }}
                />
              ) : (
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Photo not available
                </span>
              )}
            </div>
          </div>

          {/* Selfie Photo */}
          <div>
            <h4 style={{ 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              Selfie Photo
            </h4>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid var(--color-border)'
            }}>
              {faceComparison.selfiePhotoUrl ? (
                <img 
                  src={faceComparison.selfiePhotoUrl} 
                  alt="Selfie photo"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = '<span style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Image unavailable</span>'
                  }}
                />
              ) : (
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Photo not available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Similarity Score and Match Result */}
        <div className="grid grid-cols-2 gap-md">
          {/* Similarity Score */}
          <div style={{ 
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-tertiary)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'var(--font-size-xs)', 
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Similarity Score
            </div>
            {faceComparison.similarityScore !== null ? (
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: getSimilarityColor(faceComparison.similarityScore),
                marginBottom: 'var(--spacing-xs)'
              }}>
                {faceComparison.similarityScore}%
              </div>
            ) : (
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                --
              </div>
            )}
            <div style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)'
            }}>
              {faceComparison.similarityScore !== null ? '0-100 scale' : 'Not available'}
            </div>
          </div>

          {/* Match Result */}
          <div style={{ 
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-tertiary)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: 'var(--font-size-xs)', 
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Match Result
            </div>
            {faceComparison.matchResult ? (
              <Badge 
                variant={getMatchVariant(faceComparison.matchResult)}
                style={{ 
                  fontSize: 'var(--font-size-lg)',
                  padding: 'var(--spacing-sm) var(--spacing-lg)'
                }}
              >
                {getMatchLabel(faceComparison.matchResult)}
              </Badge>
            ) : (
              <Badge 
                variant="neutral"
                style={{ 
                  fontSize: 'var(--font-size-lg)',
                  padding: 'var(--spacing-sm) var(--spacing-lg)'
                }}
              >
                Unavailable
              </Badge>
            )}
          </div>
        </div>

        {/* Explanation */}
        {faceComparison.explanation && (
          <div style={{ 
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-tertiary)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            <strong>Assessment Explanation:</strong>
            <p style={{ margin: 'var(--spacing-xs) 0 0 0' }}>
              {faceComparison.explanation}
            </p>
          </div>
        )}

      </div>
    </Card>
  )
}

export default FaceComparison