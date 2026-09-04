/**
 * Screening Result Data Model
 * 
 * This model defines the structure for screening results that will be received
 * from the backend API. All fields are optional to handle partial/unavailable data.
 */

export const ScreeningStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

export const RiskLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

export const ConfidenceState = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  UNKNOWN: 'unknown'
}

/**
 * Base screening result model
 */
export const createScreeningResult = (data = {}) => ({
  // Basic identification
  screeningId: data.screeningId || null,
  status: data.status || ScreeningStatus.PENDING,
  
  // Document information
  documentType: data.documentType || null,
  
  // Risk assessment
  riskScore: data.riskScore || null, // 0-100
  riskLevel: data.riskLevel || null, // LOW, MEDIUM, HIGH
  confidenceState: data.confidenceState || ConfidenceState.UNKNOWN,
  
  // Recommendations
  recommendation: data.recommendation || null,
  
  // Module results
  moduleResults: data.moduleResults || {
    documentClassification: null,
    ocrExtraction: null,
    documentValidation: null,
    qrMrzConsistency: null,
    tamperingForensics: null,
    faceVerification: null,
    crossDocumentConsistency: null,
    riskAssessment: null,
    explainableReport: null,
    auditRecord: null
  },
  
  // Evidence and reasons
  evidence: data.evidence || [],
  reasons: data.reasons || [],
  
  // Timestamps
  createdAt: data.createdAt || null,
  startedAt: data.startedAt || null,
  completedAt: data.completedAt || null,
  updatedAt: data.updatedAt || null
})

/**
 * Module result structure
 */
export const createModuleResult = (data = {}) => ({
  moduleName: data.moduleName || null,
  status: data.status || null, // pending, processing, completed, warning, failed, not_available
  result: data.result || null,
  confidence: data.confidence || null,
  details: data.details || null,
  error: data.error || null,
  timestamp: data.timestamp || null
})

/**
 * Evidence item structure
 */
export const createEvidenceItem = (data = {}) => ({
  type: data.type || null, // tampering, inconsistency, validation_failure, etc.
  severity: data.severity || null, // low, medium, high
  description: data.description || null,
  location: data.location || null, // where in the document
  confidence: data.confidence || null,
  timestamp: data.timestamp || null
})

/**
 * Validation helpers
 */
export const isValidScreeningResult = (result) => {
  return result && result.screeningId && result.status
}

export const isScreeningComplete = (result) => {
  return result && result.status === ScreeningStatus.COMPLETED
}

export const hasRiskData = (result) => {
  return result && result.riskScore !== null && result.riskLevel !== null
}

export const getRiskLevelLabel = (riskLevel) => {
  const labels = {
    [RiskLevel.LOW]: 'Low Screening Risk — Proceed With Standard Checks',
    [RiskLevel.MEDIUM]: 'Moderate Screening Risk — Additional Review Recommended',
    [RiskLevel.HIGH]: 'High Screening Risk — Manual Review Required'
  }
  return labels[riskLevel] || 'Risk Level Unknown'
}

export const getRiskLevelColor = (riskLevel) => {
  const colors = {
    [RiskLevel.LOW]: 'var(--color-success)',
    [RiskLevel.MEDIUM]: 'var(--color-warning)',
    [RiskLevel.HIGH]: 'var(--color-error)'
  }
  return colors[riskLevel] || 'var(--color-text-muted)'
}