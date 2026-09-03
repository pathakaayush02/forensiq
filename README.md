# FORENSIQ

**SIH26188 — AI-Based Fake Identity & Document Screening System**

Theme: Blockchain & Cybersecurity

## Project Description

FORENSIQ is an AI-assisted identity and travel-document screening platform designed to help verify the authenticity of identity documents such as passports, visas, and selfies. The system uses AI to assist in screening, providing risk assessments and recommendations while emphasizing that it is not a substitute for official government authentication.

## Current Architecture

The project follows a clean, minimal architecture with separate frontend and backend:

- **Frontend**: React + Vite application for user interface
- **Backend**: Python + FastAPI application for API services

## Folder Structure

```
FORENSIQ/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application screens
│   │   ├── services/      # API communication
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   └── .gitignore
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI application
│   │   ├── api.py         # API routes
│   │   ├── schemas.py     # Pydantic models
│   │   └── config.py      # Configuration
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher) for frontend
- **Python** (v3.9 or higher) for backend
- **npm** or **yarn** for package management

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create environment file:
   ```bash
   cp .env.example .env
   ```

6. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Running the Application

To run both services:

1. **Backend** (terminal 1):
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. **Frontend** (terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Health Endpoint

The backend provides a health check endpoint:
- **URL**: `http://localhost:8000/health`
- **Response**: 
  ```json
  {
    "status": "healthy",
    "service": "forensiq-api"
  }
  ```

## Current Implementation Status

**Phase 1 - Foundation** (Current):
- ✅ Clean project structure
- ✅ Frontend React + Vite setup
- ✅ Backend FastAPI setup
- ✅ Basic API endpoints (health, screenings placeholder)
- ✅ Frontend-backend connectivity
- ✅ Environment configuration
- ✅ Documentation

**Future Modules** (Not yet implemented):
- OCR document extraction
- Document validation
- QR/MRZ verification
- Tampering detection
- Face verification
- Cross-document consistency
- Risk assessment engine
- Database integration
- Blockchain audit trail

## API Endpoints

- `GET /health` - Health check
- `POST /api/v1/screenings` - Create screening request (placeholder)
- `GET /api/v1/screenings/{screening_id}` - Get screening details (placeholder)
- `GET /api/v1/screenings/{screening_id}/status` - Get screening status (placeholder)

## Development Notes

- This project uses synthetic/demo identity documents for development only
- The system does not claim 100% fake detection or legal authentication
- All screening results should be considered as AI-assisted recommendations
- Real identity documents should never be committed to the repository

## Verification Results

**Backend Tests:**
- ✅ All backend tests passing (4/4)
- ✅ Health endpoint returns correct response
- ✅ Screening API endpoints functional (placeholder)

**Frontend Tests:**
- ✅ Development server starts successfully
- ✅ Production build completes successfully
- ✅ Frontend-backend connectivity verified

**Dependencies:**
- Backend: FastAPI, Uvicorn, Pydantic, Pydantic Settings, Python Multipart, Pytest, HTTPX
- Frontend: React, React DOM, React Router, Vite

## Security

- Never commit `.env` files or real secrets
- Use `.env.example` as a template for environment variables
- Ensure `.gitignore` files are properly configured
- Do not store real identity documents in the repository
