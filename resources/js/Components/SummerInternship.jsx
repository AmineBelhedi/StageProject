import '../../css/SummerInternship.css';
import promoImg from '../assets/summer.png';
import { Button } from 'primereact/button';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SummerPromo() {
  const { auth } = usePage().props;
  const user = auth?.user;

  const [showModal, setShowModal] = useState(false);

  const handleApplyClick = () => {
    if (user && user.role === 'student') {
      
      router.visit('/dashboard/student');
    } else if (user && user.role === 'company') {
      
      setShowModal(true);
    } else {
      
      router.visit('/login');
    }
  };

  return (
    <section className="summer-promo">
      <img src={promoImg} alt="promo" />
      <h2>Stages d'été</h2>
      <p>Trouvez le stage parfait pour booster votre carrière.</p>
      <Button
        label="Postulez ici"
        className="promo-btn p-button-rounded p-button-danger"
        onClick={handleApplyClick}
      />

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Information</h3>
            <p>Cette fonctionnalité est réservée uniquement aux étudiants.</p>
            <Button label="Fermer" onClick={() => setShowModal(false)}  className="close-btn"/>
          </div>
        </div>
      )}
    </section>
  );
}
