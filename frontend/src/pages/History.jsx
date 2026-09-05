import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'
import Badge from '../components/Badge'
import Status from '../components/Status'

function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [backendAvailable, setBackendAvailable] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch history
    // In production, this would call the backend API
    const fetchHistory = async () => {
      try {
        // Placeholder for actual API call
        // const response = await fetchHistoryFromBackend()
        // setHistory(response)
        // setBackendAvailable(true)
        
        // For now, simulate empty state
        setLoading(false)
        setBackendAvailable(false)
      } catch (err) {
        console.error('Failed to fetch history:', err)
        setError('Unable to load screening history')
        setBackendAvailable(false)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Available'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return dateString
    }
  }

  const getRiskLevelVariant = (riskLevel) => {
    const variantMap = {
      low: 'success',
      medium: 'warning',
      high: 'error'
    }
    return variantMap[riskLevel] || 'neutral'
  }

  const getStatusVariant = (status) => {
    const variantMap = {
      completed: 'success',
      processing: 'warning',
      pending: 'neutral',
      failed: 'error'
    }
    return variantMap[status] || 'neutral'
  }

  const handleViewResult = (screeningId) => {
    navigate('/results', { state: { screeningId } })
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1>Screening History</h1>
          <p>View your past document screenings</p>
        </div>
        <Status variant="loading">
          Loading history...
        </Status>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Screening History</h1>
        <p>View your past document screenings</p>
      </div>

      {/* Backend Status */}
      {!backendAvailable && (
        <Notice variant="info" style={{ marginBottom: '2rem' }}>
          <p><strong>History Not Available:</strong> The screening history feature is not yet connected to the backend. This will display your past screenings once the backend API is implemented.</p>
        </Notice>
      )}

      {error && (
        <Notice variant="error" style={{ marginBottom: '2rem' }}>
          <p><strong>Error:</strong> {error}</p>
        </Notice>
      )}

      {/* Empty State */}
      {(!backendAvailable || history.length === 0) && (
        <Card title="No Screening History">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              color: 'var(--color-text-muted)' 
            }}>
              📋
            </div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              No Screening History Available
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              {!backendAvailable 
                ? 'Screening history will be available once the backend API is implemented.'
                : 'You haven\'t completed any document screenings yet.'}
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

      {/* History Table (when data is available) */}
      {backendAvailable && history.length > 0 && (
        <Card title="Screening History">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: 'var(--font-size-sm)'
            }}>
              <thead>
                <tr style={{ 
                  borderBottom: '2px solid var(--color-border)',
                  textAlign: 'left'
                }}>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Screening ID
                  </th>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Date/Time
                  </th>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Document Type
                  </th>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Risk Level
                  </th>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Status
                  </th>
                  <th style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.screeningId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: 'var(--spacing-md)', fontFamily: 'monospace' }}>
                      {item.screeningId}
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      {formatDate(item.createdAt)}
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      {item.documentType || 'Unknown'}
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      {item.riskLevel ? (
                        <Badge variant={getRiskLevelVariant(item.riskLevel)}>
                          {item.riskLevel.toUpperCase()}
                        </Badge>
                      ) : (
                        <Badge variant="neutral">Unknown</Badge>
                      )}
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleViewResult(item.screeningId)}
                      >
                        View Result
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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

export default History