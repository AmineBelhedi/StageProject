import '../../css/Navbar.css';
import logo from '../assets/logo.jpg';
import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Navbar() {
  const { props } = usePage();
  const user = props.auth.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    router.post('/logout', {
      onFinish: () => {
        window.location.href = '/';
      }
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="StageTrouve" />
        <span>StageConnect</span>
      </div>

      
      <div className="navbar__menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      <nav className={`navbar__links ${isOpen ? 'active' : ''}`}>
        <Link href="/" className="navbar__link">Accueil</Link>

        <Link
          href={
            user
              ? (user.role === 'student'
                  ? '/dashboard/student'
                  : '/dashboard/company')
              : '/login'
          }
          className="navbar__link"
        >
          Offres
        </Link>

        <Link href="/#about" className="navbar__btn-text">À propos</Link>

        {user ? (
          <>
            <Link
              href={
                user.role === 'student'
                  ? '/student/profile'
                  : '/entreprise/profile'
              }
              className="navbar__link"
            >
              Profil
            </Link>

            <button onClick={handleLogout} className="navbar__btn navbar__btn--secondary">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="navbar__btn">Connexion</button>
            </Link>
            <Link href="/register">
              <button className="navbar__btn navbar__btn--secondary">Inscription</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
