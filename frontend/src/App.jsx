import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Screening from './pages/Screening'
import Processing from './pages/Processing'
import Results from './pages/Results'
import History from './pages/History'
import Demo from './pages/Demo'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Layout>
  )
}

export default App
