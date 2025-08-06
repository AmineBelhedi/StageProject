import React from 'react';
import Navbar from '../Components/Navbar';
import OfferCard from '../Components/OfferCard';
import '../../css/CompanyDashboard.css';
import { router, usePage } from '@inertiajs/react';
import Footer from '../Components/Footer';

const CompanyDashboard = () => {
  const { props } = usePage();
  const offers = props.offers || [];

  const goToAddOffer = () => {
    router.visit('/entreprise/ajouter-offre');
  };

  const handleEdit = (id) => {
    router.visit(route('internships.edit', id));
  };

  const handleDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      router.delete(route('internships.destroy', id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="company-dashboard-container">
        <h2 className="dashboard-title">Mes Offres de Stage</h2>
        <button onClick={goToAddOffer} className="add-offer-btn">
          + Ajouter une offre
        </button>

        {offers.length > 0 ? (
          offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={{
                ...offer,
                location: offer.lieu,
                candidates: new Array(offer.candidates_count || 0),
              }}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Aucune offre pour le moment.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CompanyDashboard;
