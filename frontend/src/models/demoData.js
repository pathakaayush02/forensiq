import { 
  createScreeningResult,
  EvidenceCategory
} from './screeningResult'

/**
 * Demo fixture data for STEP 5 testing
 * This creates a complete screening result with all STEP 5 components
 */
export const createCompleteDemoData = () => {
  return createScreeningResult({
    screeningId: 'demo-screening-123',
    status: 'completed',
    documentType: 'passport',
    riskScore: 35,
    riskLevel: 'medium',
    confidenceState: 'high',
    recommendation: 'Additional review recommended due to some inconsistent data points',
    
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
        description: 'OCR confidence score is within acceptable range',
        value: 87,
        confidence: 0.92
      },
      {
        moduleName: 'Document Validation',
        category: EvidenceCategory.DOCUMENT_COMPLETENESS,
        status: 'not_detected',
        severity: 'low',
        description: 'All required document fields are present',
        value: 'complete',
        confidence: 0.95
      },
      {
        moduleName: 'Identifier Validation',
        category: EvidenceCategory.IDENTIFIER_FORMAT,
        status: 'detected',
        severity: 'medium',
        description: 'Document number format shows minor irregularity',
        value: 'format_issue_detected',
        confidence: 0.78,
        location: 'page 1, line 3'
      },
      {
        moduleName: 'Date Validation',
        category: EvidenceCategory.DATE_EXPIRY_CHECKS,
        status: 'not_detected',
        severity: 'low',
        description: 'Document expiry date is valid and within acceptable range',
        value: 'valid',
        confidence: 0.99
      },
      {
        moduleName: 'Layout Analysis',
        category: EvidenceCategory.LAYOUT_CONSISTENCY,
        status: 'not_detected',
        severity: 'low',
        description: 'Document layout matches expected template',
        value: 'consistent',
        confidence: 0.88
      },
      {
        moduleName: 'QR Code Analysis',
        category: EvidenceCategory.QR_CONSISTENCY,
        status: 'detected',
        severity: 'medium',
        description: 'QR code data shows slight inconsistency with printed information',
        value: 'minor_mismatch',
        confidence: 0.82
      },
      {
        moduleName: 'MRZ Validation',
        category: EvidenceCategory.MRZ_CONSISTENCY,
        status: 'not_detected',
        severity: 'low',
        description: 'MRZ data is consistent with document information',
        value: 'consistent',
        confidence: 0.94
      },
      {
        moduleName: 'Tampering Detection',
        category: EvidenceCategory.TAMPERING_INDICATORS,
        status: 'not_detected',
        severity: 'low',
        description: 'No obvious tampering indicators detected',
        value: 'none_detected',
        confidence: 0.91
      },
      {
        moduleName: 'Image Quality',
        category: EvidenceCategory.IMAGE_QUALITY,
        status: 'detected',
        severity: 'low',
        description: 'Image quality is acceptable but could be improved',
        value: 72,
        confidence: 0.85
      },
      {
        moduleName: 'Face Verification',
        category: EvidenceCategory.FACE_SIMILARITY,
        status: 'detected',
        severity: 'medium',
        description: 'Face similarity score suggests possible match but requires review',
        value: 68,
        confidence: 0.79
      },
      {
        moduleName: 'Cross-Document Check',
        category: EvidenceCategory.CROSS_DOCUMENT_CONSISTENCY,
        status: 'not_detected',
        severity: 'low',
        description: 'Cross-document information is consistent',
        value: 'consistent',
        confidence: 0.93
      },
      {
        moduleName: 'Metadata Analysis',
        category: EvidenceCategory.METADATA_STAMP_ANOMALIES,
        status: 'not_detected',
        severity: 'low',
        description: 'No metadata or stamp anomalies detected',
        value: 'clean',
        confidence: 0.96
      }
    ],
    
    reasons: [
      {
        type: 'Data Inconsistency',
        severity: 'medium',
        description: 'Minor inconsistency detected between QR code data and printed information'
      },
      {
        type: 'Face Match',
        severity: 'medium',
        description: 'Face similarity score suggests potential match but requires manual review'
      },
      {
        type: 'Document Format',
        severity: 'low',
        description: 'Document number format shows minor irregularity but appears valid'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'DEMO NAME',
        dateOfBirth: '1990-01-15',
        nationality: 'DEMO',
        gender: 'M'
      },
      document: {
        number: 'DEMO123456',
        type: 'Passport',
        issueDate: '2020-05-10',
        expiryDate: '2030-05-10'
      },
      mrz: {
        status: 'valid',
        ocrMrzConsistency: 'consistent',
        extractedData: {
          line1: 'P<DEMONAME<<DEMO<<<<<<<<<<<<<<<<<<<<<<<<<',
          line2: 'DEMO123456<DEMO9001155M3001015<<<<<<<<<<<<<<04',
          line3: 'DEMO123456<DEMO9001155M3001015<<<<<<<<<<<<<<04'
        }
      },
      qr: {
        readability: 'readable',
        consistency: 'inconsistent',
        extractedData: {
          documentNumber: 'DEMO123457',
          expiryDate: '2030-05-11'
        }
      }
    },
    
    forensicData: {
      available: true,
      originalImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5Eb2N1bWVudCBJbWFnZTwvdGV4dD48L3N2Zz4=',
      overlayImageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48cmVjdCB4PSIxMDAiIHk9IjUwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9InJnYmEoMjU1LCAwLCAwLCAwLjMpIiBzdHJva2U9InJlZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSIzMCIgZmlsbD0icmdiYSgwLCAyNTUsIDAsIDAuMykiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
      markers: [
        {
          x: 25,
          y: 17,
          width: 15,
          height: 13,
          color: '#ff0000',
          label: 'Region 1',
          description: 'Potential tampering area'
        },
        {
          x: 50,
          y: 50,
          width: 8,
          height: 10,
          color: '#00ff00',
          label: 'Region 2',
          description: 'Verified region'
        }
      ],
      explanation: 'Forensic analysis revealed two regions of interest. Region 1 shows potential tampering indicators, while Region 2 appears normal. Overall document structure is intact.'
    },
    
    faceComparison: {
      available: true,
      documentPhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI2NjYyIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzk5OSIvPjwvc3ZnPg==',
      selfiePhotoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2QwZDBkMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI2JiYiIvPjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzg4OCIvPjwvc3ZnPg==',
      similarityScore: 68,
      matchResult: 'no_match',
      explanation: 'Face similarity score of 68% indicates a potential match but falls below the standard threshold. Manual review recommended due to image quality factors and angle differences.'
    },
    
    crossDocumentConsistency: {
      nameConsistency: 'consistent',
      dobConsistency: 'consistent',
      nationalityConsistency: 'consistent',
      validityConsistency: 'consistent',
      documentRelationship: 'related',
      explanation: 'All provided documents show consistent identity information. Documents appear to belong to the same individual with no discrepancies found in name, date of birth, or nationality.'
    },
    
    auditData: {
      available: true,
      screeningId: 'demo-screening-123',
      timestamp: new Date().toISOString(),
      recordHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
      previousHash: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0',
      integrityStatus: 'verified'
    },
    
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    startedAt: new Date(Date.now() - 3500000).toISOString(),
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * Demo fixture data with missing fields for testing
 */
export const createPartialDemoData = () => {
  return createScreeningResult({
    screeningId: 'demo-partial-456',
    status: 'completed',
    documentType: 'id_card',
    riskScore: 25,
    riskLevel: 'low',
    confidenceState: 'medium',
    recommendation: 'Proceed with standard checks',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'completed',
      qrMrzConsistency: 'not_available',
      tamperingForensics: 'not_available',
      faceVerification: 'not_available',
      crossDocumentConsistency: 'not_available',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'not_available'
    },
    
    evidence: [
      {
        moduleName: 'OCR Extraction',
        category: EvidenceCategory.OCR_CONFIDENCE,
        status: 'not_detected',
        severity: 'low',
        description: 'OCR extraction completed successfully',
        value: 92,
        confidence: 0.95
      },
      {
        moduleName: 'Document Validation',
        category: EvidenceCategory.DOCUMENT_COMPLETENESS,
        status: 'not_detected',
        severity: 'low',
        description: 'Document validation passed',
        value: 'valid',
        confidence: 0.98
      }
    ],
    
    reasons: [
      {
        type: 'Validation',
        severity: 'low',
        description: 'Document validation completed with no issues'
      }
    ],
    
    documentDetails: {
      identity: {
        name: 'PARTIAL NAME',
        dateOfBirth: null,
        nationality: 'PARTIAL',
        gender: null
      },
      document: {
        number: 'PARTIAL789',
        type: 'ID Card',
        issueDate: '2021-03-15',
        expiryDate: null
      },
      mrz: {
        status: null,
        ocrMrzConsistency: null,
        extractedData: null
      },
      qr: {
        readability: null,
        consistency: null,
        extractedData: null
      }
    },
    
    forensicData: {
      available: false
    },
    
    faceComparison: {
      available: false
    },
    
    crossDocumentConsistency: {
      nameConsistency: null,
      dobConsistency: null,
      nationalityConsistency: null,
      validityConsistency: null,
      documentRelationship: null,
      explanation: null
    },
    
    auditData: {
      available: false
    },
    
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    startedAt: new Date(Date.now() - 7100000).toISOString(),
    completedAt: new Date(Date.now() - 100000).toISOString(),
    updatedAt: new Date(Date.now() - 100000).toISOString()
  })
}

/**
 * Demo fixture data with unavailable STEP 5 components
 */
export const createUnavailableDemoData = () => {
  return createScreeningResult({
    screeningId: 'demo-unavailable-789',
    status: 'completed',
    documentType: 'passport',
    riskScore: 45,
    riskLevel: 'medium',
    confidenceState: 'low',
    recommendation: 'Manual review required',
    
    moduleResults: {
      documentClassification: 'completed',
      ocrExtraction: 'completed',
      documentValidation: 'warning',
      qrMrzConsistency: 'not_available',
      tamperingForensics: 'not_available',
      faceVerification: 'not_available',
      crossDocumentConsistency: 'not_available',
      riskAssessment: 'completed',
      explainableReport: 'completed',
      auditRecord: 'not_available'
    },
    
    evidence: [],
    
    reasons: [
      {
        type: 'Data Availability',
        severity: 'high',
        description: 'Some analysis modules were unavailable during screening'
      }
    ],
    
    documentDetails: null,
    forensicData: null,
    faceComparison: null,
    crossDocumentConsistency: null,
    auditData: null,
    
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    startedAt: new Date(Date.now() - 10700000).toISOString(),
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  })
}