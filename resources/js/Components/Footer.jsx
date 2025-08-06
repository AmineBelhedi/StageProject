import React from 'react';
import '../../css/Footer.css';
import { Button } from 'primereact/button';
import { Link, usePage } from '@inertiajs/react';

const Footer = () => {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li><Link href="/">Accueil</Link></li>

            {user?.role === 'company' && (
              <li><Link href="/entreprise/ajouter-offre">Publier une offre</Link></li>
            )}

            {user?.role === 'student' && (
              <li><Link href="/dashboard/student">Rechercher un stage</Link></li>
            )}
          </ul>
        </div>


        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email : contact@stageconnect.fr</p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <div className="social-icons icon-colored">
            <a href="https://facebook.com/StageConnect" target="_blank" rel="noopener noreferrer">
              <Button icon="pi pi-facebook" className="p-button-rounded p-button-text" />
            </a>
            <a href="https://linkedin.com/company/StageConnect" target="_blank" rel="noopener noreferrer">
              <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text" />
            </a>
            <a href="https://twitter.com/StageConnect" target="_blank" rel="noopener noreferrer">
              <Button icon="pi pi-twitter" className="p-button-rounded p-button-text" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 StageConnect. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
