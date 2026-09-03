import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'

function Processing() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Processing Screening</h1>
        <p>Your documents are being analyzed</p>
      </div>

      <Notice variant="info">
        <p><strong>Coming Soon:</strong> Document processing and AI analysis will be implemented in future steps.</p>
      </Notice>

      <Card title="Processing Status">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
          This page will show real-time progress of document screening, including OCR processing, face verification, and risk assessment.
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link to="/">
            <Button variant="secondary">
              Return to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Processing