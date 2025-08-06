import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import '../../css/InternshipCard.css';

const InternshipCard = ({ title, company, location, duration, type, onApply, logo }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [motivation, setMotivation] = useState('');

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setMotivation('');
  };

  const handleConfirmApply = () => {
    if (onApply) {
      onApply(motivation);
    }
    closeDialog();
  };

  const dialogFooter = (
    <>
      <Button label="Annuler" icon="pi pi-times" onClick={closeDialog} className="p-button-text" />
      <Button label="Confirmer" icon="pi pi-check" onClick={handleConfirmApply} autoFocus />
    </>
  );

  return (
    <>
      <Card className="internship-card">
        <div className="card-header">
          <div>
            <h3 className="internship-title">{title}</h3>
            <p className="company-name">{company?.user?.name || 'Entreprise inconnue'}</p>
          </div>
          {logo && <img src={`/storage/${logo}`} alt={`${company?.user?.name} logo`} className="company-logo" />}
        </div>

        <div className="card-details">
          <p><i className="pi pi-map-marker"></i> {location}</p>
          <p><i className="pi pi-clock"></i> {duration}</p>
          <p><i className="pi pi-briefcase"></i> {type}</p>
        </div>

        <Button 
          label="Postuler"
          className="p-button-sm p-button-rounded apply-btn"
          onClick={openDialog}
        />
      </Card>

      <Dialog
        header="Lettre de motivation"
        visible={showDialog}
        style={{ width: '400px' }}
        footer={dialogFooter}
        onHide={closeDialog}
      >
        <InputTextarea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          rows={5}
          autoResize
          placeholder="Écrivez votre lettre de motivation ici..."
          className="motivation-textarea"
        />
      </Dialog>
    </>
  );
};

export default InternshipCard;
