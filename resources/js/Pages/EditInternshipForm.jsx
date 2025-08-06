import React from 'react';
import '../../css/AddInternshipForm.css'; 
import Navbar from '../Components/Navbar';
import { useForm } from '@inertiajs/react';
import Footer from '../Components/Footer';

const EditInternshipForm = ({ internship }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: internship.title || '',
    lieu: internship.lieu || '',
    duration: internship.duration || '',
    type: internship.type || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('internships.update', internship.id));
  };

  return (
    <>
      <Navbar />
      <div className="add-offer-container">
        <h2>Modifier l'Offre de Stage</h2>
        <form onSubmit={handleSubmit} className="offer-form">
          <label>Titre du poste</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="error">{errors.title}</div>}

          <label>Lieu</label>
          <input
            type="text"
            name="lieu"
            value={data.lieu}
            onChange={handleChange}
            required
          />
          {errors.lieu && <div className="error">{errors.lieu}</div>}

          <label>Durée</label>
          <input
            type="text"
            name="duration"
            value={data.duration}
            onChange={handleChange}
            required
          />
          {errors.duration && <div className="error">{errors.duration}</div>}

          <label>Type de stage</label>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="Temps plein">Temps plein</option>
            <option value="Temps partiel">Temps partiel</option>
            <option value="Stage de fin d'études">Stage de fin d'études</option>
          </select>
          {errors.type && <div className="error">{errors.type}</div>}

          <button type="submit" className="submit-btn" disabled={processing}>
            Enregistrer les modifications
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditInternshipForm;
