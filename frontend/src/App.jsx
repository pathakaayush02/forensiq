import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Screening from './pages/Screening'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
      </Routes>
    </div>
  )
}

export default App
