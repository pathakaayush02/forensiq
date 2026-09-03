import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checkHealth } from '../services/api'
import Button from '../components/Button'
import Card from '../components/Card'
import Status from '../components/Status'
import Notice from '../components/Notice'
import FileUpload from '../components/FileUpload'
import Badge from '../components/Badge'

function Screening() {
  const [passportFile, setPassportFile] = useState(null)
  const [selfieFile, setSelfieFile] = useState(null)
  const [visaFile, setVisaFile] = useState(null)
  const [additionalFile, setAdditionalFile] = useState(null)
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

  const handleStartScreening = () => {
    alert('Screening functionality not yet implemented. This is a placeholder.')
  }

  return (
    <div className="container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Document Screening Workspace</h1>
        <p>Upload your identity documents for AI-assisted screening and verification</p>
      </div>

      {/* Backend Status */}
      <Status variant={healthStatus} style={{ marginBottom: '1.5rem' }}>
        {healthMessage}
      </Status>

      {/* Development Notice */}
      <Notice variant="warning" style={{ marginBottom: '2rem' }}>
        <p><strong>Development Notice:</strong> This screening workspace uses synthetic/demo identity documents for development and testing only. Do not upload real identity documents.</p>
      </Notice>

      {/* File Upload Section */}
      <div className="grid grid-cols-1 gap-lg">
        {/* Required Documents */}
        <Card 
          title={
            <div className="flex items-center gap-sm">
              Required Documents
              <Badge variant="error">Required</Badge>
            </div>
          }
        >
          <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            <p><strong>Accepted formats:</strong> JPG, PNG, PDF (Max 10MB per file)</p>
          </div>

          <FileUpload
            label="Passport / Primary Document"
            description="Upload passport or primary government-issued ID (synthetic/demo only)"
            accept="image/*,.pdf"
            onChange={setPassportFile}
            selectedFile={passportFile}
          />
          
          <FileUpload
            label="Selfie Photo"
            description="Upload recent selfie photo for face verification (synthetic/demo only)"
            accept="image/*"
            onChange={setSelfieFile}
            selectedFile={selfieFile}
            className="mt-lg"
          />
        </Card>

        {/* Optional Documents */}
        <Card 
          title={
            <div className="flex items-center gap-sm">
              Optional Documents
              <Badge variant="neutral">Optional</Badge>
            </div>
          }
        >
          <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            <p><strong>Accepted formats:</strong> JPG, PNG, PDF (Max 10MB per file)</p>
          </div>

          <FileUpload
            label="Visa Document"
            description="Upload visa or travel document if applicable (synthetic/demo only)"
            accept="image/*,.pdf"
            onChange={setVisaFile}
            selectedFile={visaFile}
          />

          <FileUpload
            label="Additional Document"
            description="Upload any additional supporting documents (synthetic/demo only)"
            accept="image/*,.pdf"
            onChange={setAdditionalFile}
            selectedFile={additionalFile}
            className="mt-lg"
          />
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-lg">
          <Link to="/">
            <Button variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button 
            variant="primary"
            onClick={handleStartScreening}
            disabled={!passportFile || !selfieFile}
          >
            Start Screening
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Screening
