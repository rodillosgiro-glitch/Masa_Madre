import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">MASA MADRE</span>
          <p className="footer-tagline">Fortalecimiento a la panificación artesanal</p>
        </div>

        <nav className="footer-nav">
          <Link to="/">Inicio</Link>
          <Link to="/recetas">Recetas</Link>
        </nav>

        <div className="footer-info">
          <p>Soacha - Cundinamarca</p>
          <p>© 2025 · Proyecto SENA</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
