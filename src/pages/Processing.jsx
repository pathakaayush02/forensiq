import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Notice from '../components/Notice'
import Status from '../components/Status'
import PipelineStage from '../components/PipelineStage'
import { getScreeningStatus, getScreening } from '../services/api'

function Processing() {
  const navigate = useNavigate()
  const location = useLocation()
  const screeningId = location.state?.screeningId
  const simulationStarted = useRef(false)

  const [stages, setStages] = useState([
    { id: 1, name: 'Document Classification', status: 'pending', description: 'Identifying document type and structure' },
    { id: 2, name: 'OCR', status: 'pending', description: 'Extracting text and data from documents' },
    { id: 3, name: 'OCR Normalization', status: 'pending', description: 'Normalizing extracted OCR data' },
    { id: 4, name: 'Document Validation', status: 'pending', description: 'Validating document format and security features' },
    { id: 5, name: 'MRZ Check', status: 'pending', description: 'Checking machine-readable zone consistency' },
    { id: 6, name: 'QR Check', status: 'pending', description: 'Validating QR code data and consistency' },
    { id: 7, name: 'Image Forensics', status: 'pending', description: 'Analyzing for signs of document tampering' },
    { id: 8, name: 'Face Detection', status: 'pending', description: 'Detecting faces in document and selfie images' },
    { id: 9, name: 'Face Similarity', status: 'pending', description: 'Comparing document photo with selfie' },
    { id: 10, name: 'Cross-Document Consistency', status: 'pending', description: 'Checking consistency across multiple documents' },
    { id: 11, name: 'Risk Assessment', status: 'pending', description: 'Calculating overall screening risk score' },
    { id: 12, name: 'Final Result', status: 'pending', description: 'Generating final screening result' },
    { id: 13, name: 'Audit Event', status: 'pending', description: 'Creating audit trail for compliance' }
  ])
  
  const [backendStatus, setBackendStatus] = useState('loading')
  const [backendMessage, setBackendMessage] = useState('Connecting to screening service...')
  const [currentStage, setCurrentStage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!screeningId) {
      // No screening ID - this is a development navigation
      setBackendStatus('unavailable')
      setBackendMessage('Screening service unavailable - development mode')
      setStages(prev => prev.map(stage => ({ ...stage, status: 'not_available' })))
      // Start simulation in development mode
      simulateProgress()
      return
    }

    // Try to get real screening status from backend
    const fetchStatus = async () => {
      try {
        const status = await getScreeningStatus(screeningId)
        setBackendStatus('healthy')
        setBackendMessage('Screening in progress')
        
        // Map backend status to our stages
        if (status.stages) {
          const mappedStages = status.stages.map(stage => ({
            ...stage,
            status: mapBackendStatus(stage.status)
          }))
          setStages(mappedStages)
        }
        
        if (status.completed) {
          setIsComplete(true)
          setTimeout(() => {
            navigate('/results', { state: { screeningId } })
          }, 2000)
        }
      } catch (err) {
        console.error('Failed to fetch screening status:', err)
        setBackendStatus('error')
        setBackendMessage('Unable to connect to screening service')
        setStages(prev => prev.map(stage => ({ ...stage, status: 'not_available' })))
        // Start simulation when backend fails
        simulateProgress()
      }
    }

    fetchStatus()
  }, [screeningId, navigate])

  const simulateProgress = () => {
    if (simulationStarted.current) return
    simulationStarted.current = true
    
    let stageIndex = 0
    
    const interval = setInterval(() => {
      if (stageIndex >= stages.length) {
        clearInterval(interval)
        setIsComplete(true)
        setTimeout(() => {
          navigate('/results', { state: { screeningId: screeningId || 'demo-screening-id' } })
        }, 2000)
        return
      }

      setStages(prev => {
        const newStages = [...prev]
        newStages[stageIndex] = { ...newStages[stageIndex], status: 'processing' }
        return newStages
      })

      setTimeout(() => {
        setStages(prev => {
          const newStages = [...prev]
          newStages[stageIndex] = { ...newStages[stageIndex], status: 'completed' }
          return newStages
        })
        stageIndex++
      }, 1500)
    }, 2000)

    return () => clearInterval(interval)
  }

  const mapBackendStatus = (backendStatus) => {
    // Map backend module states to PipelineStage status prop
    const statusMap = {
      'PENDING': 'pending',
      'PROCESSING': 'processing',
      'COMPLETED': 'completed',
      'WARNING': 'warning',
      'FAILED': 'failed',
      'UNAVAILABLE': 'not_available'
    }
    return statusMap[backendStatus] || 'pending'
  }

  const getOverallProgress = () => {
    const completed = stages.filter(s => s.status === 'completed').length
    return Math.round((completed / stages.length) * 100)
  }

  return (
    <div className="container">
      {/* Page Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1>Document Screening Processing</h1>
        <p>AI-assisted analysis in progress</p>
      </header>

      {/* Backend Status */}
      <Status variant={backendStatus === 'healthy' ? 'healthy' : backendStatus === 'error' ? 'error' : 'loading'}>
        {backendMessage}
      </Status>

      {/* Development Notice */}
      {backendStatus !== 'healthy' && (
        <Notice variant="warning" style={{ marginBottom: '2rem' }}>
          <p><strong>Development Mode:</strong> Screening service is unavailable. Showing simulated progress for demonstration purposes. This does not represent real AI analysis.</p>
        </Notice>
      )}

      {/* Overall Progress */}
      <Card title="Overall Progress" style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: 'var(--color-background-input)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '0.5rem'
          }}>
            <div style={{ 
              width: `${getOverallProgress()}%`, 
              height: '100%', 
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-sm)',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {getOverallProgress()}% Complete
            </span>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {stages.filter(s => s.status === 'completed').length} / {stages.length} Stages
            </span>
          </div>
        </div>
      </Card>

      {/* Pipeline Stages */}
      <Card title="Processing Pipeline">
        {stages.map((stage, index) => (
          <PipelineStage
            key={stage.id}
            stage={stage.id}
            title={stage.name}
            description={stage.description}
            status={stage.status}
            progress={stage.status === 'processing' ? 50 : 0}
            error={stage.error}
          />
        ))}
      </Card>

      {/* Complete State */}
      {isComplete && (
        <Notice variant="success" style={{ marginTop: '2rem' }}>
          <p><strong>Screening Complete:</strong> Redirecting to results page...</p>
        </Notice>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-lg">
        <Link to="/screening">
          <Button variant="secondary" disabled={isComplete}>
            Cancel Screening
          </Button>
        </Link>
        {isComplete && (
          <Link to="/results" state={{ screeningId: screeningId || 'demo-screening-id' }}>
            <Button variant="primary">
              View Results
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Processing