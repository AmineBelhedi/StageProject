import React from 'react';
import '../../css/StudentProfileView.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const StudentProfileView = ({ student }) => {
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="section-title">Profil de {student.user.name}</h2>

        <section className="section">
          <h3>Informations personnelles</h3>
          <p><strong>Email :</strong> {student.user.email}</p>
          <p><strong>Téléphone :</strong> {student.phone || 'N/A'}</p>
        </section>

        <section className="section">
          <h3>Formation</h3>
          <p><strong>Établissement :</strong> {student.school || 'N/A'}</p>
          <p><strong>Niveau :</strong> {student.level || 'N/A'}</p>
          <p><strong>Année :</strong> {student.year || 'N/A'}</p>
        </section>

        <section className="section">
          <h3>Compétences</h3>
          <div className="skills-container">
            {student.skills && student.skills.length > 0 ? (
              student.skills.map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))
            ) : (
              <p>Aucune compétence renseignée.</p>
            )}
          </div>
        </section>

        <section className="section">
          <h3>Expérience</h3>
          {student.experience ? (
            <div>
              <p><strong>Poste :</strong> {student.experience}</p>
              <p><strong>Durée :</strong> {student.duree || 'N/A'}</p>
              <p><strong>Description :</strong> {student.experience_description || 'N/A'}</p>
            </div>
          ) : (
            <p>Aucune expérience renseignée.</p>
          )}
        </section>



        <section className="section">
          <h3>Documents</h3>
          {student.cv_url ? (
            <p>
              <strong>CV :</strong>{" "}
              <a href={student.cv_url} target="_blank" rel="noreferrer">Télécharger</a>
            </p>
          ) : (
            <p>Pas de CV disponible.</p>
          )}
        </section>

        <section className="section">
          <h3>À propos de moi</h3>
          <p>{student.description || 'Pas de description disponible.'}</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default StudentProfileView;
