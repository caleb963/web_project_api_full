import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerTitle from '../images/header__title.png';

function Header({ isAuthenticated, onLogout }) {
  const location = useLocation();
    return (
        <header className="header">
             <img src={headerTitle} alt="header-title" className="header__title" />
             {isAuthenticated ? (
                <button onClick={onLogout} className="header__button">Logout</button> ) : (
      <nav className="header__nav">
        <Link to={location.pathname == '/signin' ? '/signup':'/signin' } className="header__link">{location.pathname == '/signin' ? 'Register':'Login'}</Link>
      </nav>               
       )}
        </header>
    );
}

export default Header;