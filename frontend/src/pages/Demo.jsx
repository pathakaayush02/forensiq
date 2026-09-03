import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'

function Demo() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Demo Mode</h1>
        <p>Explore FORENSIQ with sample data</p>
      </div>

      <Notice variant="info">
        <p><strong>Coming Soon:</strong> Demo mode with sample documents and simulated screening results will be implemented in future steps.</p>
      </Notice>

      <Card title="Demo Overview">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
          This page will provide an interactive demo experience with pre-loaded sample documents and simulated AI screening results to showcase platform capabilities.
        </p>
        <div className="flex justify-center gap-md">
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
      </Card>
    </div>
  )
}

export default Demo