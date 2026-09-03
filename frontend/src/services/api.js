const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`)
    if (!response.ok) {
      throw new Error('Health check failed')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Health check error:', error)
    throw error
  }
}

export async function createScreening(screeningData) {
  try {
    const response = await fetch(`${API_URL}/api/v1/screenings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screeningData),
    })
    if (!response.ok) {
      throw new Error('Failed to create screening')
    }
    return await response.json()
  } catch (error) {
    console.error('Create screening error:', error)
    throw error
  }
}

export async function getScreening(screeningId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/screenings/${screeningId}`)
    if (!response.ok) {
      throw new Error('Failed to get screening')
    }
    return await response.json()
  } catch (error) {
    console.error('Get screening error:', error)
    throw error
  }
}

export async function getScreeningStatus(screeningId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/screenings/${screeningId}/status`)
    if (!response.ok) {
      throw new Error('Failed to get screening status')
    }
    return await response.json()
  } catch (error) {
    console.error('Get screening status error:', error)
    throw error
  }
}
