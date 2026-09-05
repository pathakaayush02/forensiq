import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'
import Badge from '../components/Badge'
import { demoScenarios } from '../models/demoScenarios'

function Demo() {
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState(null)

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario)
    // Navigate to results with demo data
    const demoResult = scenario.creator()
    navigate('/results', { 
      state: { 
        screeningId: demoResult.screeningId,
        isDemo: true,
        demoData: demoResult
      } 
    })
  }

  const getRiskLevelVariant = (riskLevel) => {
    const variantMap = {
      low: 'success',
      medium: 'warning',
      high: 'error'
    }
    return variantMap[riskLevel] || 'neutral'
  }

  const getRiskLevelColor = (riskLevel) => {
    const colorMap = {
      low: 'var(--color-success)',
      medium: 'var(--color-warning)',
      high: 'var(--color-error)'
    }
    return colorMap[riskLevel] || 'var(--color-text-muted)'
  }

  return (
    <div className="container">
      {/* Page Header */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Demo Mode</h1>
        <p>Explore FORENSIQ with synthetic sample data</p>
      </header>

      {/* Demo Mode Notice */}
      <Notice variant="warning" style={{ marginBottom: '2rem' }}>
        <div className="flex items-center gap-sm" style={{ flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>DEMO MODE ACTIVE</strong>
            <p style={{ margin: 'var(--spacing-xs) 0 0 0', fontSize: 'var(--font-size-sm)' }}>
              All data shown is synthetic and fictional for demonstration purposes only. 
              No real documents, identities, or government information is used.
            </p>
          </div>
        </div>
      </Notice>

      {/* Demo Scenarios */}
      <Card title="Demo Scenarios">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
          Select a demo scenario to experience the complete screening workflow with synthetic data. 
          Each scenario demonstrates different risk levels and analysis outcomes.
        </p>
        
        <div className="grid grid-cols-1 gap-md">
          {demoScenarios.map((scenario) => (
            <div 
              key={scenario.id}
              style={{
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-background-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--spacing-md)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => handleSelectScenario(scenario)}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div className="flex items-center gap-sm mb-sm">
                  <Badge variant="info" style={{ fontSize: 'var(--font-size-xs)' }}>
                    Scenario {scenario.id}
                  </Badge>
                  <Badge variant={getRiskLevelVariant(scenario.riskLevel)}>
                    {scenario.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <h4 style={{ 
                  margin: '0 0 var(--spacing-xs) 0',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-base)'
                }}>
                  {scenario.title}
                </h4>
                <p style={{ 
                  margin: 0,
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  {scenario.description}
                </p>
              </div>
              
              <div style={{ 
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  fontWeight: 'var(--font-weight-bold)',
                  color: getRiskLevelColor(scenario.riskLevel),
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {scenario.riskScore}
                </div>
                <div style={{ 
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)'
                }}>
                  Risk Score
                </div>
              </div>

              <Button variant="primary" size="small">
                Run Demo
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Demo Information */}
      <Card title="About Demo Mode" style={{ marginTop: '2rem' }}>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            <strong>Scenario A - Low Risk:</strong> Demonstrates a normal screening with a synthetic valid document and matching selfie. All validation checks pass with high confidence.
          </p>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            <strong>Scenario B - Medium Risk:</strong> Shows a screening with minor anomalies such as format irregularities and slightly reduced image quality. Requires additional review but no clear fraud indicators.
          </p>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            <strong>Scenario C - High Risk:</strong> Displays multiple suspicious indicators including potential tampering, format mismatches, and inconsistent data. Requires manual review and investigation.
          </p>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            <strong>Scenario D - Face Mismatch:</strong> Focuses on face comparison where the document photo and selfie show significant differences, indicating potential identity fraud.
          </p>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            <strong>Scenario E - Cross-Document Mismatch:</strong> Demonstrates inconsistencies between different document sections (printed vs. machine-readable zones) that suggest data manipulation.
          </p>
          <div style={{ 
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '3px solid var(--color-info)'
          }}>
            <strong>Important:</strong> All demo data is entirely synthetic. No real personal information, document numbers, or government identifiers are used. This is for demonstration and testing purposes only.
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-lg">
        <Link to="/">
          <Button variant="secondary">
            Return to Home
          </Button>
        </Link>
        <Link to="/screening">
          <Button variant="primary">
            Try Real Screening
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Demo