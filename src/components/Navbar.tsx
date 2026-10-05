import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <img 
              src="/image/logo_pagina.png" 
              alt="Masa Madre Logo" 
              className="navbar-logo-img"
            />
          </Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/recetas" 
              className={`nav-link ${location.pathname === '/recetas' ? 'active' : ''}`}
            >
              Recetas
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/calculadora" 
              className={`nav-link ${location.pathname === '/calculadora' ? 'active' : ''}`}
            >
              Calculadora
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
