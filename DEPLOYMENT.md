# FORENSIQ Frontend - GitHub Pages Deployment Guide

## Overview
This frontend is configured for GitHub Pages deployment and ready to be connected to a backend API.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- GitHub account

## Current Structure
The frontend folder contains only essential files for deployment:
- Source code (`src/`)
- Configuration files (`vite.config.js`, `package.json`)
- Environment example (`.env.example`)
- HTML entry point (`index.html`)

## Deployment Steps

### 1. Prepare for GitHub Pages

#### Option A: Using GitHub Actions (Recommended)
1. Create a new GitHub repository or use an existing one
2. Push the `frontend` folder contents to the repository
3. Go to repository Settings → Pages
4. Source: Select "GitHub Actions"
5. Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Option B: Manual Deployment
1. Build the project: `npm run build`
2. Upload the contents of the `dist/` folder to your GitHub repository
3. Go to repository Settings → Pages
4. Source: Select "Deploy from a branch"
5. Branch: `main` (or your branch) → `/docs` folder
6. Rename `dist` to `docs` before uploading

### 2. Connecting to Backend

#### Environment Configuration
1. Copy `.env.example` to `.env`
2. Set your backend API URL:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```
3. For local development with backend:
   ```
   VITE_API_URL=http://localhost:8000
   ```

#### Backend API Requirements
The frontend expects the following API endpoints:
- `GET /health` - Health check
- `POST /api/v1/screenings` - Create new screening
- `GET /api/v1/screenings/{id}` - Get screening results
- `GET /api/v1/screenings/{id}/status` - Get screening status

#### CORS Configuration
Your backend must allow CORS from your GitHub Pages domain:
```
Access-Control-Allow-Origin: https://yourusername.github.io
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 3. Development vs Production

#### Local Development
```bash
npm install
npm run dev
```
- Runs on `http://localhost:5173`
- Uses HashRouter for client-side routing
- Backend calls will fail if VITE_API_URL not set

#### Production Build
```bash
npm run build
```
- Creates optimized `dist/` folder
- Relative paths (`base: './'`) for GitHub Pages
- Code splitting for better performance

### 4. Testing Before Deployment

#### Test Build Locally
```bash
npm run build
npm run preview
```
- Serves the production build locally
- Test routing and functionality
- Verify backend connection if configured

#### Test Demo Mode
- Access `/demo` route
- Test all 5 demo scenarios
- Verify fallback to demo mode when backend unavailable

### 5. Important Notes

#### Demo Mode Behavior
- When `VITE_API_URL` is not set, backend calls will fail gracefully
- The app will show "Backend unavailable" notices
- Demo Mode will still work with synthetic data
- This is intentional for demonstration purposes

#### Security Considerations
- Never commit `.env` files with real API keys
- Use GitHub Secrets for sensitive data in Actions
- Implement proper authentication on your backend
- Validate all input on the backend side

#### Performance
- Build size: ~95KB (main) + 162KB (router) + 14KB (CSS)
- Gzipped: ~19KB + 53KB + 3KB
- Code splitting implemented for better caching
- No source maps in production (smaller size)

### 6. Troubleshooting

#### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 16+)
- Verify vite.config.js syntax

#### Routing Issues
- HashRouter is used (no server-side routing needed)
- All routes work with `#/` prefix
- GitHub Pages compatible

#### Backend Connection Issues
- Check browser console for API errors
- Verify CORS settings on backend
- Test backend endpoints directly
- Check network tab in browser dev tools

#### GitHub Pages Not Updating
- Check Actions tab for deployment status
- Clear browser cache
- Wait up to 10 minutes for DNS propagation
- Verify repository visibility settings

### 7. File Structure After Cleanup

```
frontend/
├── .env.example          # Environment configuration template
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── src/
│   ├── main.jsx          # React entry point
│   ├── design-system.css # CSS variables and utilities
│   ├── App.jsx           # Main app component
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── models/           # Data models
│   └── services/         # API service layer
└── dist/                 # Build output (generated)
```

### 8. Next Steps

1. **Deploy to GitHub Pages** using the methods above
2. **Test the deployed site** thoroughly
3. **Connect your backend** when ready by setting VITE_API_URL
4. **Monitor performance** and user feedback
5. **Update as needed** based on backend API changes

## Support
For issues or questions, refer to:
- Vite documentation: https://vitejs.dev/
- React Router documentation: https://reactrouter.com/
- GitHub Pages documentation: https://docs.github.com/pages
