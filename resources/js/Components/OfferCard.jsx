import React from 'react';
import '../../css/OfferCard.css';
import { router } from '@inertiajs/react';

const OfferCard = ({ offer, onEdit, onDelete }) => {
  const handleViewCandidates = () => {
    router.visit(`/entreprise/offre/${offer.id}/candidats`);
  };

  return (
    <div className="offer-card">
      <h3>{offer.title}</h3>
      <p><strong>Lieu :</strong> {offer.location}</p>
      <p><strong>Durée :</strong> {offer.duration}</p>
      <p><strong>Type :</strong> {offer.type}</p>
      <div className="candidates-info">
        <p><strong>Candidats :</strong> {offer.candidates.length}</p>
        {offer.candidates.length > 0 && (
          <button className="view-btn" onClick={handleViewCandidates}>
            Voir les candidats
          </button>
        )}
      </div>

      
      <div className="offer-actions">
        {onEdit && (
          <button
            className="btn-edit"
            onClick={() => onEdit(offer.id)}
          >
            Modifier
          </button>
        )}
        {onDelete && (
          <button
            className="btn-delete"
            onClick={() => {
              if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
                onDelete(offer.id);
              }
            }}
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
