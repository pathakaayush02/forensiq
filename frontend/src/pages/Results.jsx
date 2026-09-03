import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'

function Results() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Screening Results</h1>
        <p>View your document screening analysis</p>
      </div>

      <Notice variant="info">
        <p><strong>Coming Soon:</strong> Screening results and detailed analysis reports will be implemented in future steps.</p>
      </Notice>

      <Card title="Results Overview">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
          This page will display comprehensive screening results including document validation, face verification status, risk assessment scores, and detailed findings.
        </p>
        <div className="flex justify-center gap-md">
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
      </Card>
    </div>
  )
}

export default Results