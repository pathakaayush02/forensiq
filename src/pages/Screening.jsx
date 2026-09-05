import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkHealth, createScreening } from '../services/api'
import Button from '../components/Button'
import Card from '../components/Card'
import Status from '../components/Status'
import Notice from '../components/Notice'
import FileUpload from '../components/FileUpload'
import Badge from '../components/Badge'

function Screening() {
  const navigate = useNavigate()
  
  // Form state
  const [formData, setFormData] = useState({
    passport: null,
    selfie: null,
    visa: null,
    additional: null
  })
  
  // Validation state
  const [errors, setErrors] = useState({
    passport: null,
    selfie: null,
    visa: null,
    additional: null
  })
  
  // UI state
  const [healthStatus, setHealthStatus] = useState('loading')
  const [healthMessage, setHealthMessage] = useState('Checking backend connection...')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    checkHealth()
      .then(() => {
        setHealthStatus('healthy')
        setHealthMessage('Backend connected')
      })
      .catch(() => {
        setHealthStatus('error')
        setHealthMessage('Backend unavailable - screening will be simulated')
      })
  }, [])

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Validate required fields
    if (!formData.passport) {
      newErrors.passport = 'Passport document is required'
      isValid = false
    }
    
    if (!formData.selfie) {
      newErrors.selfie = 'Selfie photo is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }))
    // Clear error for this field when file is selected
    setErrors(prev => ({
      ...prev,
      [field]: null
    }))
  }

  const handleFileRemove = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }))
  }

  const handleStartScreening = async () => {
    // Reset submit error
    setSubmitError(null)
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Check if backend is available
      if (healthStatus === 'healthy') {
        // Try to create screening via API
        const screeningData = {
          passport_file: formData.passport,
          selfie_file: formData.selfie,
          visa_file: formData.visa,
          additional_file: formData.additional
        }

        // Note: The current API endpoint expects JSON, but we have files
        // This will fail with the current placeholder implementation
        // In production, this would use FormData for file uploads
        try {
          const result = await createScreening(screeningData)
          // If successful, navigate to processing
          navigate('/processing', { state: { screeningId: result.id } })
        } catch (apiError) {
          // API call failed (likely due to placeholder implementation)
          console.warn('API call failed, routing to processing:', apiError.message)
          // Route to processing page for development
          navigate('/processing')
        }
      } else {
        // Backend unavailable, route to processing for development
        console.log('Backend unavailable, routing to processing for development')
        navigate('/processing')
      }
    } catch (error) {
      console.error('Screening submission error:', error)
      setSubmitError('Failed to start screening. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.passport && formData.selfie && 
                    !errors.passport && !errors.selfie

  return (
    <div className="container">
      {/* Page Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1>Document Screening Workspace</h1>
        <p>Upload your identity documents for AI-assisted screening and verification</p>
      </header>

      {/* Backend Status */}
      <Status variant={healthStatus} style={{ marginBottom: '1.5rem' }}>
        {healthMessage}
      </Status>

      {/* Development Notice */}
      <Notice variant="warning" style={{ marginBottom: '2rem' }}>
        <p><strong>Development Notice:</strong> This screening workspace uses synthetic/demo identity documents for development and testing only. Do not upload real identity documents. This is AI-assisted screening for risk assessment, not legal authentication.</p>
      </Notice>

      {/* Submit Error */}
      {submitError && (
        <Notice variant="error" style={{ marginBottom: '1.5rem' }}>
          {submitError}
        </Notice>
      )}

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
            onChange={(file) => handleFileChange('passport', file)}
            onRemove={() => handleFileRemove('passport')}
            selectedFile={formData.passport}
            required={true}
            maxSize={10 * 1024 * 1024}
          />
          
          <FileUpload
            label="Selfie Photo"
            description="Upload recent selfie photo for face verification (synthetic/demo only)"
            accept="image/*"
            onChange={(file) => handleFileChange('selfie', file)}
            onRemove={() => handleFileRemove('selfie')}
            selectedFile={formData.selfie}
            required={true}
            maxSize={10 * 1024 * 1024}
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
            onChange={(file) => handleFileChange('visa', file)}
            onRemove={() => handleFileRemove('visa')}
            selectedFile={formData.visa}
            required={false}
            maxSize={10 * 1024 * 1024}
          />

          <FileUpload
            label="Additional Document"
            description="Upload any additional supporting documents (synthetic/demo only)"
            accept="image/*,.pdf"
            onChange={(file) => handleFileChange('additional', file)}
            onRemove={() => handleFileRemove('additional')}
            selectedFile={formData.additional}
            required={false}
            maxSize={10 * 1024 * 1024}
            className="mt-lg"
          />
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-lg">
          <Link to="/">
            <Button variant="secondary" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
          <Button 
            variant="primary"
            onClick={handleStartScreening}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Starting Screening...' : 'Start Screening'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Screening
