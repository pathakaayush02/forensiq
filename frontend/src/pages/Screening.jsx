import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checkHealth } from '../services/api'

function Screening() {
  const [passportFile, setPassportFile] = useState(null)
  const [selfieFile, setSelfieFile] = useState(null)
  const [visaFile, setVisaFile] = useState(null)
  const [healthStatus, setHealthStatus] = useState('loading')
  const [healthMessage, setHealthMessage] = useState('Checking backend connection...')

  useEffect(() => {
    checkHealth()
      .then(() => {
        setHealthStatus('healthy')
        setHealthMessage('Backend connected')
      })
      .catch(() => {
        setHealthStatus('error')
        setHealthMessage('Backend unavailable')
      })
  }, [])

  const handlePassportUpload = (e) => {
    if (e.target.files[0]) {
      setPassportFile(e.target.files[0])
    }
  }

  const handleSelfieUpload = (e) => {
    if (e.target.files[0]) {
      setSelfieFile(e.target.files[0])
    }
  }

  const handleVisaUpload = (e) => {
    if (e.target.files[0]) {
      setVisaFile(e.target.files[0])
    }
  }

  const handleStartScreening = () => {
    alert('Screening functionality not yet implemented. This is a placeholder.')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Document Screening</h1>
        <p>Upload documents for AI-assisted screening</p>
      </div>

      <div className={`status status-${healthStatus}`}>
        {healthMessage}
      </div>

      <div className="notice">
        <p><strong>Development Notice:</strong> This screening workspace uses synthetic/demo identity documents for development and testing only.</p>
      </div>

      <div className="upload-area">
        <h3>Passport Document</h3>
        <p>Upload passport image (synthetic/demo only)</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={handlePassportUpload}
        />
        {passportFile && <p style={{ marginTop: '0.5rem', color: '#27ae60' }}>Selected: {passportFile.name}</p>}
      </div>

      <div className="upload-area">
        <h3>Selfie Photo</h3>
        <p>Upload selfie image (synthetic/demo only)</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleSelfieUpload}
        />
        {selfieFile && <p style={{ marginTop: '0.5rem', color: '#27ae60' }}>Selected: {selfieFile.name}</p>}
      </div>

      <div className="upload-area">
        <h3>Visa Document (Optional)</h3>
        <p>Upload visa image if applicable (synthetic/demo only)</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleVisaUpload}
        />
        {visaFile && <p style={{ marginTop: '0.5rem', color: '#27ae60' }}>Selected: {visaFile.name}</p>}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="button button-primary"
          onClick={handleStartScreening}
          disabled={!passportFile || !selfieFile}
        >
          Start Screening
        </button>
        <Link to="/">
          <button className="button button-secondary" style={{ marginLeft: '1rem' }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Screening
