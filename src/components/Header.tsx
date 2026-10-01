import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-overlay">
        <div className="header-content">
          <div className="year-badge">
            <div className="year">2027</div>
            <div className="location">Soacha - Cundinamarca</div>
          </div>

          <div className="main-content">
            <div className="topics">
              <h2 className="topic-title">¿QUÉ ES LA MASA MADRE?</h2>
              <p className="topic-item">RECETAS<br />TRADICIONALES</p>
              <p className="topic-item highlight">HISTORIAS<br />DE VIDA</p>
              <p className="topic-item">TÉCNICAS DE<br />AMASADO Y<br />HORNEADO</p>
            </div>

            <div className="title-section">
              <div className="special-label">ESPECIAL</div>
              <h1 className="main-title">
                <span className="title-masa">MASA</span>
                <span className="title-madre">MADRE</span>
              </h1>
              <p className="subtitle">Fortalecimiento a la panificación artesanal</p>
            </div>
          </div>

          <div className="logo-container">
            <img src="/image/logoSena1.png" alt="SENA Logo" className="sena-logo" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
