import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>FORENSIQ</h1>
        <p>AI-Assisted Identity and Travel-Document Screening Platform</p>
      </div>
      
      <div className="notice">
        <p><strong>Note:</strong> This system uses synthetic/demo identity documents for development purposes only.</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/screening">
          <button className="button button-primary" style={{ marginRight: '1rem' }}>
            Start Screening
          </button>
        </Link>
        <button className="button button-secondary">
          Demo Mode
        </button>
      </div>
    </div>
  )
}

export default Home
