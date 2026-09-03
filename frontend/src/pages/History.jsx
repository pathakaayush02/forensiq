import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'

function History() {
  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Screening History</h1>
        <p>View your past document screenings</p>
      </div>

      <Notice variant="info">
        <p><strong>Coming Soon:</strong> Screening history and past results will be implemented in future steps.</p>
      </Notice>

      <Card title="History Overview">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
          This page will display your screening history with options to review past results, download reports, and track screening status over time.
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

export default History