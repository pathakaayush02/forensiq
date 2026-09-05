import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-4xl)', 
          marginBottom: '0.5rem',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-cyber-blue)'
        }}>
          FORENSIQ
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-xl)', 
          color: 'var(--color-text-secondary)',
          marginBottom: '1rem'
        }}>
          AI-Assisted Identity and Travel-Document Screening
        </p>
        <p style={{ 
          fontSize: 'var(--font-size-base)', 
          color: 'var(--color-text-muted)',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Advanced document verification platform combining OCR, face recognition, and risk assessment for secure identity screening.
        </p>
      </header>
      
      {/* Development Notice */}
      <Notice variant="info" style={{ marginBottom: '2rem' }}>
        <p><strong>Development Notice:</strong> This system uses synthetic/demo identity documents for development purposes only. No real identity documents should be uploaded.</p>
      </Notice>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-lg" style={{ marginBottom: '2rem' }}>
        <Card title="Start New Screening">
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
            Begin a new document screening session by uploading your identity documents for AI-assisted analysis.
          </p>
          <Link to="/screening">
            <Button variant="primary" size="large">
              Start New Screening
            </Button>
          </Link>
        </Card>

        <Card title="Demo Mode">
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
            Explore the platform capabilities with sample data and simulated screening results.
          </p>
          <Link to="/demo">
            <Button variant="secondary" size="large">
              Demo Mode
            </Button>
          </Link>
        </Card>
      </div>

      {/* Platform Overview */}
      <Card title="Platform Capabilities">
        <div className="grid grid-cols-3 gap-md">
          <div>
            <h4 style={{ 
              color: 'var(--color-cyber-blue)', 
              marginBottom: '0.5rem',
              fontSize: 'var(--font-size-base)'
            }}>
              Document Analysis
            </h4>
            <p className="text-small text-muted">
              Advanced OCR and document validation for passports, visas, and identity documents.
            </p>
          </div>
          <div>
            <h4 style={{ 
              color: 'var(--color-cyber-purple)', 
              marginBottom: '0.5rem',
              fontSize: 'var(--font-size-base)'
            }}>
              Face Verification
            </h4>
            <p className="text-small text-muted">
              AI-powered face matching between document photos and selfie uploads.
            </p>
          </div>
          <div>
            <h4 style={{ 
              color: 'var(--color-cyber-green)', 
              marginBottom: '0.5rem',
              fontSize: 'var(--font-size-base)'
            }}>
              Risk Assessment
            </h4>
            <p className="text-small text-muted">
              Comprehensive security analysis with tampering detection and fraud indicators.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home
