import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recetas from './pages/Recetas'
import Calculadora from './pages/Calculadora'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/recetas/:slug" element={<Recetas />} />
          <Route path="/calculadora" element={<Calculadora />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
