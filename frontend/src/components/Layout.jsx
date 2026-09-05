import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/screening', label: 'New Screening' },
    { path: '/history', label: 'History' },
    { path: '/demo', label: 'Demo Mode' },
    { path: '/results-test', label: 'Results Test' },
  ]

  return (
    <div className="app">
      {/* Header Navigation */}
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <div className="nav-brand-logo">FORENSIQ</div>
          <div className="nav-brand-text">AI Document Screening</div>
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout