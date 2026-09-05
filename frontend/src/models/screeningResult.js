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
 * Base screening result model (extended for STEP 5)
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
  
  // STEP 5 extended data structures
  documentDetails: data.documentDetails ? createDocumentDetails(data.documentDetails) : null,
  forensicData: data.forensicData ? createForensicData(data.forensicData) : null,
  faceComparison: data.faceComparison ? createFaceComparisonData(data.faceComparison) : null,
  crossDocumentConsistency: data.crossDocumentConsistency ? createCrossDocumentConsistency(data.crossDocumentConsistency) : null,
  auditData: data.auditData ? createAuditData(data.auditData) : null,
  
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
 * Evidence item structure (extended for STEP 5)
 */
export const createEvidenceItem = (data = {}) => ({
  type: data.type || null, // tampering, inconsistency, validation_failure, etc.
  severity: data.severity || null, // low, medium, high
  description: data.description || null,
  location: data.location || null, // where in the document
  confidence: data.confidence || null,
  timestamp: data.timestamp || null,
  moduleName: data.moduleName || null, // Which module generated this evidence
  status: data.status || null, // detected, not_detected, unavailable
  value: data.value || null, // Supporting value when available
  category: data.category || null // OCR confidence, document completeness, etc.
})

/**
 * Evidence categories for STEP 5
 */
export const EvidenceCategory = {
  OCR_CONFIDENCE: 'ocr_confidence',
  DOCUMENT_COMPLETENESS: 'document_completeness',
  IDENTIFIER_FORMAT: 'identifier_format',
  DATE_EXPIRY_CHECKS: 'date_expiry_checks',
  LAYOUT_CONSISTENCY: 'layout_consistency',
  QR_CONSISTENCY: 'qr_consistency',
  MRZ_CONSISTENCY: 'mrz_consistency',
  TAMPERING_INDICATORS: 'tampering_indicators',
  IMAGE_QUALITY: 'image_quality',
  FACE_SIMILARITY: 'face_similarity',
  CROSS_DOCUMENT_CONSISTENCY: 'cross_document_consistency',
  METADATA_STAMP_ANOMALIES: 'metadata_stamp_anomalies'
}

/**
 * Document/OCR Details structure
 */
export const createDocumentDetails = (data = {}) => ({
  // Identity information
  identity: data.identity || {
    name: null,
    dateOfBirth: null,
    nationality: null,
    gender: null
  },
  // Document information
  document: data.document || {
    number: null,
    type: null,
    issueDate: null,
    expiryDate: null
  },
  // MRZ information
  mrz: data.mrz || {
    status: null, // valid, invalid, not_available
    ocrMrzConsistency: null, // consistent, inconsistent, not_available
    extractedData: null
  },
  // QR information
  qr: data.qr || {
    readability: null, // readable, not_readable, not_available
    consistency: null, // consistent, inconsistent, not_available
    extractedData: null
  }
})

/**
 * Forensic viewer data structure
 */
export const createForensicData = (data = {}) => ({
  originalImageUrl: data.originalImageUrl || null,
  overlayImageUrl: data.overlayImageUrl || null,
  markers: data.markers || [], // Array of marker objects
  explanation: data.explanation || null,
  available: data.available !== undefined ? data.available : false
})

/**
 * Face comparison data structure
 */
export const createFaceComparisonData = (data = {}) => ({
  documentPhotoUrl: data.documentPhotoUrl || null,
  selfiePhotoUrl: data.selfiePhotoUrl || null,
  similarityScore: data.similarityScore || null, // 0-100 or null
  matchResult: data.matchResult || null, // match, no_match, unavailable
  explanation: data.explanation || null,
  available: data.available !== undefined ? data.available : false
})

/**
 * Cross-document consistency structure
 */
export const createCrossDocumentConsistency = (data = {}) => ({
  nameConsistency: data.nameConsistency || null, // consistent, inconsistent, not_available
  dobConsistency: data.dobConsistency || null,
  nationalityConsistency: data.nationalityConsistency || null,
  validityConsistency: data.validityConsistency || null,
  documentRelationship: data.documentRelationship || null, // related, unrelated, not_available
  explanation: data.explanation || null
})

/**
 * Audit/Integrity structure
 */
export const createAuditData = (data = {}) => ({
  screeningId: data.screeningId || null,
  timestamp: data.timestamp || null,
  recordHash: data.recordHash || null,
  previousHash: data.previousHash || null,
  integrityStatus: data.integrityStatus || null, // verified, tampered, not_available
  available: data.available !== undefined ? data.available : false
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