const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_V1_BASE = `${API_BASE_URL}/api/v1`

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return await response.json()
}

// Helper function to handle network errors
const handleNetworkError = (error) => {
  console.error('Network error:', error)
  throw error
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function createScreening(payload) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function uploadDocument(screeningId, documentKind, file) {
  try {
    const formData = new FormData()
    formData.append('document_kind', documentKind)
    formData.append('file', file)

    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/documents`, {
      method: 'POST',
      body: formData,
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function runScreening(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function getScreeningStatus(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/status`)
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function getScreeningResult(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/result`)
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function getScreening(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}`)
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function runOcr(screeningId, docId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/documents/${docId}/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function validateDocument(screeningId, docId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/documents/${docId}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function getFaceSimilarity(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/face-similarity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function getAuditTrail(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/audit`)
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}

export async function verifyAudit(screeningId) {
  try {
    const response = await fetch(`${API_V1_BASE}/screenings/${screeningId}/audit/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    return handleNetworkError(error)
  }
}
