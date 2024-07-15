import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <Link to="/" className="nav-link"> Accueil
          </Link></h1>
      </div>
    </header>
  );
};

export default Header;
