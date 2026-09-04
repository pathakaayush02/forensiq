import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'
import Badge from '../components/Badge'
import Status from '../components/Status'
import { getScreening } from '../services/api'
import { 
  createScreeningResult, 
  ScreeningStatus, 
  RiskLevel, 
  getRiskLevelLabel, 
  getRiskLevelColor,
  hasRiskData,
  isScreeningComplete
} from '../models/screeningResult'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const screeningId = location.state?.screeningId

  const [screeningResult, setScreeningResult] = useState(createScreeningResult())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [backendAvailable, setBackendAvailable] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!screeningId) {
        setLoading(false)
        setBackendAvailable(false)
        return
      }

      try {
        const result = await getScreening(screeningId)
        setScreeningResult(createScreeningResult(result))
        setBackendAvailable(true)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch screening results:', err)
        setError('Unable to load screening results')
        setBackendAvailable(false)
        setLoading(false)
      }
    }

    fetchResults()
  }, [screeningId])

  const getRiskScoreColor = (score) => {
    if (score === null) return 'var(--color-text-muted)'
    if (score >= 70) return 'var(--color-error)'
    if (score >= 40) return 'var(--color-warning)'
    return 'var(--color-success)'
  }

  const getRiskLevelBadgeVariant = (level) => {
    const variantMap = {
      [RiskLevel.LOW]: 'success',
      [RiskLevel.MEDIUM]: 'warning',
      [RiskLevel.HIGH]: 'error'
    }
    return variantMap[level] || 'neutral'
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Screening Results</h1>
          <p>Loading your document screening analysis...</p>
        </div>
        <Status variant="loading">
          Loading results...
        </Status>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Screening Results</h1>
        <p>AI-assisted document screening analysis</p>
      </div>

      {/* Backend Status */}
      {!backendAvailable && (
        <Notice variant="warning" style={{ marginBottom: '2rem' }}>
          <p><strong>Development Mode:</strong> Screening results are unavailable. The backend service has not provided real screening data. This is an empty state placeholder.</p>
        </Notice>
      )}

      {error && (
        <Notice variant="error" style={{ marginBottom: '2rem' }}>
          <p><strong>Error:</strong> {error}</p>
        </Notice>
      )}

      {/* Results Unavailable State */}
      {!backendAvailable && !hasRiskData(screeningResult) && (
        <Card title="Results Unavailable">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              color: 'var(--color-text-muted)' 
            }}>
              📋
            </div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              No Screening Results Available
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              The screening process has not completed or the backend service is unavailable. 
              Real screening results will appear here when the backend API is implemented.
            </p>
            <div className="flex justify-center gap-md">
              <Link to="/screening">
                <Button variant="primary">
                  Start New Screening
                </Button>
              </Link>
              <Link to="/">
                <Button variant="secondary">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Results Available State */}
      {hasRiskData(screeningResult) && (
        <>
          {/* Risk Score Card */}
          <Card title="Overall Risk Assessment" style={{ marginBottom: '2rem' }}>
            <div className="grid grid-cols-3 gap-lg">
              {/* Risk Score */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '4rem', 
                  fontWeight: 'var(--font-weight-bold)',
                  color: getRiskScoreColor(screeningResult.riskScore),
                  marginBottom: '0.5rem'
                }}>
                  {screeningResult.riskScore !== null ? screeningResult.riskScore : '--'}
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Risk Score (0-100)
                </p>
              </div>

              {/* Risk Level */}
              <div style={{ textAlign: 'center' }}>
                {screeningResult.riskLevel ? (
                  <>
                    <Badge 
                      variant={getRiskLevelBadgeVariant(screeningResult.riskLevel)}
                      style={{ 
                        fontSize: 'var(--font-size-lg)',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {screeningResult.riskLevel.toUpperCase()}
                    </Badge>
                    <p style={{ 
                      color: getRiskLevelColor(screeningResult.riskLevel),
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {getRiskLevelLabel(screeningResult.riskLevel)}
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{ 
                      fontSize: 'var(--font-size-xl)', 
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.5rem'
                    }}>
                      --
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                      Risk Level Unknown
                    </p>
                  </>
                )}
              </div>

              {/* Confidence */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 'var(--font-size-xl)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: screeningResult.confidenceState === 'high' ? 'var(--color-success)' : 
                            screeningResult.confidenceState === 'medium' ? 'var(--color-warning)' : 
                            'var(--color-text-muted)',
                  marginBottom: '0.5rem'
                }}>
                  {screeningResult.confidenceState ? screeningResult.confidenceState.toUpperCase() : 'UNKNOWN'}
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Confidence State
                </p>
              </div>
            </div>

            {/* Recommendation */}
            {screeningResult.recommendation && (
              <div style={{ 
                marginTop: '1.5rem',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-background-tertiary)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `4px solid ${getRiskLevelColor(screeningResult.riskLevel)}`
              }}>
                <p style={{ 
                  margin: 0,
                  color: 'var(--color-text-primary)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  <strong>Recommendation:</strong> {screeningResult.recommendation}
                </p>
              </div>
            )}
          </Card>

          {/* Top Reasons/Evidence */}
          {screeningResult.reasons && screeningResult.reasons.length > 0 && (
            <Card title="Key Findings" style={{ marginBottom: '2rem' }}>
              <div className="grid grid-cols-1 gap-md">
                {screeningResult.reasons.map((reason, index) => (
                  <div 
                    key={index}
                    style={{ 
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-background-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: `3px solid ${reason.severity === 'high' ? 'var(--color-error)' : 
                                          reason.severity === 'medium' ? 'var(--color-warning)' : 
                                          'var(--color-success)'}`
                    }}
                  >
                    <div className="flex items-center gap-sm mb-sm">
                      <Badge variant={reason.severity === 'high' ? 'error' : 
                                       reason.severity === 'medium' ? 'warning' : 'success'}>
                        {reason.severity?.toUpperCase() || 'INFO'}
                      </Badge>
                      <span style={{ 
                        color: 'var(--color-text-primary)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        {reason.type || 'Finding'}
                      </span>
                    </div>
                    <p style={{ 
                      margin: 0,
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Module Results Summary */}
          <Card title="Module Results Summary">
            <div className="grid grid-cols-2 gap-md">
              {Object.entries(screeningResult.moduleResults || {}).map(([key, value]) => (
                <div 
                  key={key}
                  style={{ 
                    padding: 'var(--spacing-sm)',
                    backgroundColor: 'var(--color-background-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <Badge variant={value === 'completed' ? 'success' : 
                                   value === 'warning' ? 'warning' : 
                                   value === 'failed' ? 'error' : 'neutral'}>
                    {value || 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-lg">
        <Link to="/">
          <Button variant="secondary">
            Return to Home
          </Button>
        </Link>
        <Link to="/screening">
          <Button variant="primary">
            Start New Screening
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Results