import { 
  createScreeningResult,
  EvidenceCategory
} from './screeningResult'

/**
 * Demo Scenarios for STEP 6
 * All data is synthetic and fictional for demonstration purposes only
 */

// Scenario A: Low Risk - synthetic normal document + matching selfie
export const createScenarioA_LowRisk = () => {
  return createScreeningResult({
    screeningId: 'DEMO-A-2024-001',
    status: 'completed',
    documentType: 'passport',
    riskScore: 15,
    riskLevel: 'low',
    confidenceState: 'high',
    recommendation: 'Proceed with standard checks - no concerns identified',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'completed',
      qrMrzConsistency: 'completed',
      tamperingForensics: 'completed',
      faceVerification: 'completed',
      crossDocumentConsistency: 'completed',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'completed'
    },
    
    evidence: [
      {
        moduleName: 'OCR Extraction',
        category: EvidenceCategory.OCR_CONFIDENCE,
        status: 'not_detected',
        severity: 'low',
        description: 'OCR extraction completed with high confidence',
        value: 94,
        confidence: 0.96
      },
      {
        moduleName: 'Document Validation',
        category: EvidenceCategory.DOCUMENT_COMPLETENESS,
        status: 'not_detected',
        severity: 'low',
        description: 'All required document fields present and valid',
        value: 'complete',
        confidence: 0.98
      },
      {
        moduleName: 'Face Verification',
        category: EvidenceCategory.FACE_SIMILARITY,
        status: 'not_detected',
        severity: 'low',
        description: 'Face similarity indicates strong match',
        value: 92,
        confidence: 0.94
      }
    ],
    
    reasons: [
      {
        type: 'Validation',
        severity: 'low',
        description: 'Document validation passed with no issues'
      },
      {
        type: 'Face Match',
        severity: 'low',
        description: 'Face similarity indicates strong match'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'SYNTHETIC ALFA',
        dateOfBirth: '1985-03-22',
        nationality: 'SYNTH',
        gender: 'F'
      },
      document: {
        number: 'SYNTH123456',
        type: 'Passport',
        issueDate: '2020-06-15',
        expiryDate: '2030-06-15'
      },
      mrz: {
        status: 'valid',
        ocrMrzConsistency: 'consistent',
        extractedData: {
          line1: 'P<SYNTHALFA<<SYNTHETIC<<<<<<<<<<<<<<<<<<<<<<<<<',
          line2: 'SYNTH123456<SYNTH8503225F2006155<<<<<<<<<<<<<<02'
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'consistent',
        extractedData: {
          documentNumber: 'SYNTH123456',
          expiryDate: '2030-06-15'
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5TY2VuYXJpbyBBIC0gTG93IFJpc2s8L3RleHQ+PC9zdmc+',
      overlayImageUrl: null,
      markers: [],
      explanation: 'Document analysis completed with no concerning features detected. Image quality is good and no tampering indicators found.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzk5OSIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzc3NyIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzk5OSIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzc3NyIvPjwvc3ZnPg==',
      similarityScore: 92,
      matchResult: 'match',
      explanation: 'Face similarity score of 92% indicates a strong match. Features are consistent between document photo and selfie with normal variation.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'consistent',
      dobConsistency: 'consistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'consistent',
      documentRelationship: 'related',
      explanation: 'All provided documents show perfectly consistent identity information with no discrepancies.'
    },
    
    auditData: {
      available: true,
      screeningId: 'DEMO-A-2024-001',
      timestamp: new Date().toISOString(),
      recordHash: 'demo-hash-a-' + Math.random().toString(36).substring(2, 15),
      previousHash: 'demo-previous-hash-a',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    startedAt: new Date(Date.now() - 3500000).toISOString(),
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

// Scenario B: Medium Risk - synthetic minor anomaly
export const createScenarioB_MediumRisk = () => {
  return createScreeningResult({
    screeningId: 'DEMO-B-2024-002',
    status: 'completed',
    documentType: 'id_card',
    riskScore: 45,
    riskLevel: 'medium',
    confidenceState: 'medium',
    recommendation: 'Additional review recommended due to minor data inconsistencies',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'warning',
      qrMrzConsistency: 'completed',
      tamperingForensics: 'completed',
      faceVerification: 'completed',
      crossDocumentConsistency: 'completed',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'completed'
    },
    
    evidence: [
      {
        moduleName: 'OCR Extraction',
        category: EvidenceCategory.OCR_CONFIDENCE,
        status: 'detected',
        severity: 'low',
        description: 'OCR confidence slightly below optimal threshold',
        value: 78,
        confidence: 0.82
      },
      {
        moduleName: 'Identifier Validation',
        category: EvidenceCategory.IDENTIFIER_FORMAT,
        status: 'detected',
        severity: 'medium',
        description: 'Document number format shows minor irregularity',
        value: 'format_variation',
        confidence: 0.75,
        location: 'document number field'
      },
      {
        moduleName: 'Image Quality',
        category: EvidenceCategory.IMAGE_QUALITY,
        status: 'detected',
        severity: 'low',
        description: 'Image quality acceptable but could be improved',
        value: 72,
        confidence: 0.80
      }
    ],
    
    reasons: [
      {
        type: 'Data Inconsistency',
        severity: 'medium',
        description: 'Minor format irregularity detected in document number'
      },
      {
        type: 'Image Quality',
        severity: 'low',
        description: 'Image quality below optimal but still acceptable'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'SYNTHETIC BRAVO',
        dateOfBirth: '1990-07-14',
        nationality: 'SYNTH',
        gender: 'M'
      },
      document: {
        number: 'SYNB789XYZ', // Format variation
        type: 'ID Card',
        issueDate: '2021-02-20',
        expiryDate: '2031-02-20'
      },
      mrz: {
        status: 'valid',
        ocrMrzConsistency: 'consistent',
        extractedData: {
          line1: 'ID<SYNTHBRAVO<<SYNTHETIC<<<<<<<<<<<<<<<<<<<<<<<<<',
          line2: 'SYNB789XYZ<SYNTH9007141M2102209<<<<<<<<<<<<<<01'
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'consistent',
        extractedData: {
          documentNumber: 'SYNB789XYZ',
          expiryDate: '2031-02-20'
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5TY2VuYXJpbyBCIC0gTWVkaXVtIFJpc2s8L3RleHQ+PC9zdmc+',
      overlayImageUrl: null,
      markers: [],
      explanation: 'Document shows minor format irregularity but no evidence of tampering. Overall document structure is intact.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzg4OCIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY2NiIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzg4OCIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY2NiIvPjwvc3ZnPg==',
      similarityScore: 85,
      matchResult: 'match',
      explanation: 'Face similarity score of 85% indicates a match with some variation due to image quality differences.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'consistent',
      dobConsistency: 'consistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'consistent',
      documentRelationship: 'related',
      explanation: 'Document information is consistent with minor format variations that are within acceptable ranges.'
    },
    
    auditData: {
      available: true,
      screeningId: 'DEMO-B-2024-002',
      timestamp: new Date().toISOString(),
      recordHash: 'demo-hash-b-' + Math.random().toString(36).substring(2, 15),
      previousHash: 'demo-previous-hash-b',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    startedAt: new Date(Date.now() - 7100000).toISOString(),
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  })
}

// Scenario C: High Risk - multiple synthetic suspicious indicators
export const createScenarioC_HighRisk = () => {
  return createScreeningResult({
    screeningId: 'DEMO-C-2024-003',
    status: 'completed',
    documentType: 'passport',
    riskScore: 78,
    riskLevel: 'high',
    confidenceState: 'medium',
    recommendation: 'Manual review required - multiple suspicious indicators detected',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'warning',
      documentValidation: 'failed',
      qrMrzConsistency: 'warning',
      tamperingForensics: 'warning',
      faceVerification: 'warning',
      crossDocumentConsistency: 'warning',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'completed'
    },
    
    evidence: [
      {
        moduleName: 'Tampering Detection',
        category: EvidenceCategory.TAMPERING_INDICATORS,
        status: 'detected',
        severity: 'high',
        description: 'Potential tampering detected in photo region',
        value: 'photo_anomaly',
        confidence: 0.85,
        location: 'photo area, upper right quadrant'
      },
      {
        moduleName: 'Identifier Validation',
        category: EvidenceCategory.IDENTIFIER_FORMAT,
        status: 'detected',
        severity: 'high',
        description: 'Document number format does not match expected pattern',
        value: 'format_mismatch',
        confidence: 0.92,
        location: 'document number field'
      },
      {
        moduleName: 'QR Code Analysis',
        category: EvidenceCategory.QR_CONSISTENCY,
        status: 'detected',
        severity: 'high',
        description: 'QR code data inconsistent with printed information',
        value: 'data_mismatch',
        confidence: 0.88
      },
      {
        moduleName: 'Layout Analysis',
        category: EvidenceCategory.LAYOUT_CONSISTENCY,
        status: 'detected',
        severity: 'medium',
        description: 'Document layout shows deviations from standard template',
        value: 'layout_variation',
        confidence: 0.75
      },
      {
        moduleName: 'Metadata Analysis',
        category: EvidenceCategory.METADATA_STAMP_ANOMALIES,
        status: 'detected',
        severity: 'medium',
        description: 'Stamp placement and metadata show anomalies',
        value: 'stamp_anomaly',
        confidence: 0.70
      }
    ],
    
    reasons: [
      {
        type: 'Tampering',
        severity: 'high',
        description: 'Potential tampering detected in photo region'
      },
      {
        type: 'Format Mismatch',
        severity: 'high',
        description: 'Document number format does not match expected pattern'
      },
      {
        type: 'Data Inconsistency',
        severity: 'high',
        description: 'QR code data inconsistent with printed information'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'SYNTHETIC CHARLIE',
        dateOfBirth: '1988-11-30',
        nationality: 'SYNTH',
        gender: 'M'
      },
      document: {
        number: 'SYN#INVALID@', // Clearly invalid format
        type: 'Passport',
        issueDate: '2019-09-10',
        expiryDate: '2029-09-10'
      },
      mrz: {
        status: 'invalid',
        ocrMrzConsistency: 'inconsistent',
        extractedData: {
          line1: 'P<SYNTHCHARLIE<<SYNTHETIC<<<<<<<<<<<<<<<<<<<<<',
          line2: 'SYN#INVALID@<SYNTH8811300M1909108<<<<<<<<<<<<<<03'
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'inconsistent',
        extractedData: {
          documentNumber: 'DIFFERENT123',
          expiryDate: '2028-09-10' // Different expiry
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5TY2VuYXJpbyBDIC0gSGlnaCBSaXNrPC90ZXh0Pjwvc3ZnPg==',
      overlayImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48cmVjdCB4PSIyMDAiIHk9IjUwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9InJnYmEoMjU1LCAwLCAwLCAwLjUpIiBzdHJva2U9InJlZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSI0MCIgZmlsbD0icmdiYSgyNTUsIDAsIDAsIDAuNCkiIHN0cm9rZT0ib3JhbmdlIiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIzMDAiIHk9IjgwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9InJnYmEoMjU1LCAwLCAwLCAwLjMpIiBzdHJva2U9InllbGxvdyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
      markers: [
        {
          x: 50,
          y: 17,
          width: 20,
          height: 20,
          color: '#ff0000',
          label: 'Photo Anomaly',
          description: 'Potential photo tampering detected'
        },
        {
          x: 25,
          y: 50,
          width: 10,
          height: 13,
          color: '#ff8800',
          label: 'Layout Issue',
          description: 'Layout deviation detected'
        },
        {
          x: 75,
          y: 27,
          width: 15,
          height: 13,
          color: '#ffff00',
          label: 'Stamp Anomaly',
          description: 'Stamp placement irregular'
        }
      ],
      explanation: 'Multiple suspicious indicators detected across different analysis modules. Photo region shows potential tampering, document number format is invalid, and QR data is inconsistent.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzc3NyIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzU1NSIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzY2NiIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzQ0NCIvPjwvc3ZnPg==',
      similarityScore: 72,
      matchResult: 'no_match',
      explanation: 'Face similarity score of 72% is below threshold. Differences detected in facial features possibly due to image manipulation or different individuals.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'inconsistent',
      dobConsistency: 'inconsistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'inconsistent',
      documentRelationship: 'unrelated',
      explanation: 'Multiple inconsistencies detected across document fields. Name and date of birth show variations between different document sections.'
    },
    
    auditData: {
      available: true,
      screeningId: 'DEMO-C-2024-003',
      timestamp: new Date().toISOString(),
      recordHash: 'demo-hash-c-' + Math.random().toString(36).substring(2, 15),
      previousHash: 'demo-previous-hash-c',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    startedAt: new Date(Date.now() - 10700000).toISOString(),
    completedAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString()
  })
}

// Scenario D: Face Mismatch - synthetic document photo/selfie mismatch
export const createScenarioD_FaceMismatch = () => {
  return createScreeningResult({
    screeningId: 'DEMO-D-2024-004',
    status: 'completed',
    documentType: 'passport',
    riskScore: 65,
    riskLevel: 'high',
    confidenceState: 'high',
    recommendation: 'Manual review required - face comparison indicates potential mismatch',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'completed',
      qrMrzConsistency: 'completed',
      tamperingForensics: 'completed',
      faceVerification: 'warning',
      crossDocumentConsistency: 'completed',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'completed'
    },
    
    evidence: [
      {
        moduleName: 'Face Verification',
        category: EvidenceCategory.FACE_SIMILARITY,
        status: 'detected',
        severity: 'high',
        description: 'Face similarity score indicates potential mismatch',
        value: 42,
        confidence: 0.88
      },
      {
        moduleName: 'Document Validation',
        category: EvidenceCategory.DOCUMENT_COMPLETENESS,
        status: 'not_detected',
        severity: 'low',
        description: 'Document validation passed with no issues',
        value: 'valid',
        confidence: 0.95
      },
      {
        moduleName: 'OCR Extraction',
        category: EvidenceCategory.OCR_CONFIDENCE,
        status: 'not_detected',
        severity: 'low',
        description: 'OCR extraction completed successfully',
        value: 91,
        confidence: 0.93
      }
    ],
    
    reasons: [
      {
        type: 'Face Mismatch',
        severity: 'high',
        description: 'Face comparison indicates significant differences between document photo and selfie'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'SYNTHETIC DELTA',
        dateOfBirth: '1992-05-18',
        nationality: 'SYNTH',
        gender: 'F'
      },
      document: {
        number: 'SYNTH456789',
        type: 'Passport',
        issueDate: '2021-08-25',
        expiryDate: '2031-08-25'
      },
      mrz: {
        status: 'valid',
        ocrMrzConsistency: 'consistent',
        extractedData: {
          line1: 'P<SYNTHDELTA<<SYNTHETIC<<<<<<<<<<<<<<<<<<<<<<<<<',
          line2: 'SYNTH456789<SYNTH9205185F2108255<<<<<<<<<<<<<<04'
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'consistent',
        extractedData: {
          documentNumber: 'SYNTH456789',
          expiryDate: '2031-08-25'
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5TY2VuYXJpbyBEIC0gRmFjZSBNaXNtYXRjaDwvdGV4dD48L3N2Zz4=',
      overlayImageUrl: null,
      markers: [],
      explanation: 'Document validation passed with no issues. All document features appear authentic except for face comparison concerns.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzY2NiIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzQ0NCIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzk5OSIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzc3NyIvPjwvc3ZnPg==',
      similarityScore: 42,
      matchResult: 'no_match',
      explanation: 'Face similarity score of 42% indicates a significant mismatch. Facial features show substantial differences suggesting potentially different individuals or extensive manipulation.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'consistent',
      dobConsistency: 'consistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'consistent',
      documentRelationship: 'related',
      explanation: 'Document information is internally consistent. The only concern is the face comparison result.'
    },
    
    auditData: {
      available: true,
      screeningId: 'DEMO-D-2024-004',
      timestamp: new Date().toISOString(),
      recordHash: 'demo-hash-d-' + Math.random().toString(36).substring(2, 15),
      previousHash: 'demo-previous-hash-d',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    startedAt: new Date(Date.now() - 14300000).toISOString(),
    completedAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 10800000).toISOString()
  })
}

// Scenario E: Cross-Document Mismatch - synthetic inconsistent document fields
export const createScenarioE_CrossDocumentMismatch = () => {
  return createScreeningResult({
    screeningId: 'DEMO-E-2024-005',
    status: 'completed',
    documentType: 'id_card',
    riskScore: 58,
    riskLevel: 'medium',
    confidenceState: 'medium',
    recommendation: 'Additional review required - cross-document inconsistencies detected',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'warning',
      qrMrzConsistency: 'warning',
      tamperingForensics: 'completed',
      faceVerification: 'completed',
      crossDocumentConsistency: 'warning',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'completed'
    },
    
    evidence: [
      {
        moduleName: 'Cross-Document Check',
        category: EvidenceCategory.CROSS_DOCUMENT_CONSISTENCY,
        status: 'detected',
        severity: 'high',
        description: 'Name inconsistency detected between document sections',
        value: 'name_mismatch',
        confidence: 0.90
      },
      {
        moduleName: 'Date Validation',
        category: EvidenceCategory.DATE_EXPIRY_CHECKS,
        status: 'detected',
        severity: 'medium',
        description: 'Date of birth inconsistency between printed and machine-readable zones',
        value: 'dob_mismatch',
        confidence: 0.85
      },
      {
        moduleName: 'MRZ Validation',
        category: EvidenceCategory.MRZ_CONSISTENCY,
        status: 'detected',
        severity: 'medium',
        description: 'MRZ data shows inconsistencies with printed information',
        value: 'mrz_inconsistency',
        confidence: 0.82
      }
    ],
    
    reasons: [
      {
        type: 'Cross-Document Inconsistency',
        severity: 'high',
        description: 'Name inconsistency detected between document sections'
      },
      {
        type: 'Data Mismatch',
        severity: 'medium',
        description: 'Date of birth inconsistency between printed and machine-readable zones'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'SYNTHETIC ECHO', // Printed name
        dateOfBirth: '1987-04-12', // Printed DOB
        nationality: 'SYNTH',
        gender: 'M'
      },
      document: {
        number: 'SYNTH987654',
        type: 'ID Card',
        issueDate: '2020-11-30',
        expiryDate: '2030-11-30'
      },
      mrz: {
        status: 'invalid',
        ocrMrzConsistency: 'inconsistent',
        extractedData: {
          line1: 'ID<SYNTHDIFFER<<SYNTHETIC<<<<<<<<<<<<<<<<<<<<<<<<<', // Different name in MRZ
          line2: 'SYNTH987654<SYNTH8702120M2011309<<<<<<<<<<<<<<05' // Different DOB in MRZ
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'inconsistent',
        extractedData: {
          documentNumber: 'SYNTH987654',
          expiryDate: '2030-12-01' // Slightly different expiry
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5TY2VuYXJpbyBFIC0gQ3Jvc3MtRG9jdW1lbnQgTWlzbWF0Y2g8L3RleHQ+PC9zdmc+',
      overlayImageUrl: null,
      markers: [],
      explanation: 'Document shows internal inconsistencies between printed information and machine-readable zones. Name and date of birth variations detected.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzg4OCIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY2NiIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzg4OCIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY2NiIvPjwvc3ZnPg==',
      similarityScore: 88,
      matchResult: 'match',
      explanation: 'Face similarity score of 88% indicates a match. Face comparison is not the source of concern in this screening.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'inconsistent',
      dobConsistency: 'inconsistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'inconsistent',
      documentRelationship: 'unrelated',
      explanation: 'Significant inconsistencies detected between printed document information and machine-readable zones. Name and date of birth show variations that require investigation.'
    },
    
    auditData: {
      available: true,
      screeningId: 'DEMO-E-2024-005',
      timestamp: new Date().toISOString(),
      recordHash: 'demo-hash-e-' + Math.random().toString(36).substring(2, 15),
      previousHash: 'demo-previous-hash-e',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    startedAt: new Date(Date.now() - 17900000).toISOString(),
    completedAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString()
  })
}

// Demo scenario metadata
export const demoScenarios = [
  {
    id: 'A',
    title: 'Low Risk',
    description: 'Synthetic normal document + matching selfie',
    riskLevel: 'low',
    riskScore: 15,
    creator: createScenarioA_LowRisk
  },
  {
    id: 'B',
    title: 'Medium Risk',
    description: 'Synthetic minor anomaly',
    riskLevel: 'medium',
    riskScore: 45,
    creator: createScenarioB_MediumRisk
  },
  {
    id: 'C',
    title: 'High Risk',
    description: 'Multiple synthetic suspicious indicators',
    riskLevel: 'high',
    riskScore: 78,
    creator: createScenarioC_HighRisk
  },
  {
    id: 'D',
    title: 'Face Mismatch',
    description: 'Synthetic document photo/selfie mismatch',
    riskLevel: 'high',
    riskScore: 65,
    creator: createScenarioD_FaceMismatch
  },
  {
    id: 'E',
    title: 'Cross-Document Mismatch',
    description: 'Synthetic inconsistent document fields',
    riskLevel: 'medium',
    riskScore: 58,
    creator: createScenarioE_CrossDocumentMismatch
  }
]