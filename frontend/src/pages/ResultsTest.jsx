import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Notice from '../components/Notice'
import EvidenceSection from '../components/EvidenceSection'
import DocumentDetails from '../components/DocumentDetails'
import ForensicViewer from '../components/ForensicViewer'
import FaceComparison from '../components/FaceComparison'
import CrossDocumentConsistency from '../components/CrossDocumentConsistency'
import AuditIntegrity from '../components/AuditIntegrity'
import { 
  createCompleteDemoData, 
  createPartialDemoData, 
  createUnavailableDemoData 
} from '../models/demoData'

function ResultsTest() {
  const [demoMode, setDemoMode] = useState('complete')
  const [screeningResult, setScreeningResult] = useState(createCompleteDemoData())

  const handleDemoModeChange = (mode) => {
    setDemoMode(mode)
    switch (mode) {
      case 'complete':
        setScreeningResult(createCompleteDemoData())
        break
      case 'partial':
        setScreeningResult(createPartialDemoData())
        break
      case 'unavailable':
        setScreeningResult(createUnavailableDemoData())
        break
      default:
        setScreeningResult(createCompleteDemoData())
    }
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>STEP 5 Results Test Page</h1>
        <p>Testing all new result components with demo data</p>
      </div>

      {/* Demo Mode Selector */}
      <Notice variant="info" style={{ marginBottom: '2rem' }}>
        <div className="flex items-center gap-md" style={{ flexWrap: 'wrap' }}>
          <span><strong>Demo Mode:</strong></span>
          <div className="flex gap-sm">
            <Button 
              variant={demoMode === 'complete' ? 'primary' : 'secondary'}
              onClick={() => handleDemoModeChange('complete')}
              size="small"
            >
              Complete Data
            </Button>
            <Button 
              variant={demoMode === 'partial' ? 'primary' : 'secondary'}
              onClick={() => handleDemoModeChange('partial')}
              size="small"
            >
              Partial Data
            </Button>
            <Button 
              variant={demoMode === 'unavailable' ? 'primary' : 'secondary'}
              onClick={() => handleDemoModeChange('unavailable')}
              size="small"
            >
              Unavailable Data
            </Button>
          </div>
        </div>
      </Notice>

      {/* Current Demo Info */}
      <div style={{ 
        marginBottom: '2rem',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-background-tertiary)',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-secondary)'
      }}>
        <strong>Current Test:</strong> {demoMode === 'complete' ? 'Complete demo data with all STEP 5 components' : 
                                     demoMode === 'partial' ? 'Partial data with missing fields' : 
                                     'Data with unavailable STEP 5 components'}
        <div style={{ marginTop: 'var(--spacing-xs)' }}>
          Screening ID: {screeningResult.screeningId} | Risk Level: {screeningResult.riskLevel} | Score: {screeningResult.riskScore}
        </div>
      </div>

      {/* Evidence Section */}
      <div style={{ marginBottom: '2rem' }}>
        <EvidenceSection 
          evidence={screeningResult.evidence} 
          title="Evidence Analysis"
        />
      </div>

      {/* Document/OCR Details */}
      <div style={{ marginBottom: '2rem' }}>
        <DocumentDetails 
          documentDetails={screeningResult.documentDetails}
        />
      </div>

      {/* Forensic Viewer */}
      <div style={{ marginBottom: '2rem' }}>
        <ForensicViewer 
          forensicData={screeningResult.forensicData}
        />
      </div>

      {/* Face Comparison */}
      <div style={{ marginBottom: '2rem' }}>
        <FaceComparison 
          faceComparison={screeningResult.faceComparison}
        />
      </div>

      {/* Cross-Document Consistency */}
      <div style={{ marginBottom: '2rem' }}>
        <CrossDocumentConsistency 
          crossDocumentConsistency={screeningResult.crossDocumentConsistency}
        />
      </div>

      {/* Audit/Integrity */}
      <div style={{ marginBottom: '2rem' }}>
        <AuditIntegrity 
          auditData={screeningResult.auditData}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-lg">
        <Link to="/">
          <Button variant="secondary">
            Return to Home
          </Button>
        </Link>
        <Link to="/results">
          <Button variant="primary">
            View Results Page
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ResultsTest