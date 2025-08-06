import React from 'react';
import NewInternshipCard from '../Components/NewInternshipCard';
import '../../css/LatestOffersSection.css';

export default function LatestOffersSection({ offers, onApply }) {
  return (
    <section className="offers-section">
      <h2>Dernières Offres de Stage</h2>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <NewInternshipCard
              key={offer.id}
              title={offer.title}
              company={offer.company.user.name}
              location={offer.lieu}
              duration={offer.duration}
              type={offer.type}
              logo={offer.company.logo ? `/storage/${offer.company.logo}` : null}
              onApply={(motivation) => onApply(offer.id, motivation)}
            />
          ))
        ) : (
          <p>Aucune offre disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
