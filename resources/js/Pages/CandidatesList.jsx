import React from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import '../../css/StudentDashboard.css'; 
import Footer from '../Components/Footer';

const CandidatesList = () => {
  const { props } = usePage();
  const { internship, applications } = props;

  const handleViewProfile = (studentId) => {
    router.visit(`/student-profile/${studentId}`);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Candidatures pour : {internship.title}</h2>

        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="internship-card" style={{ padding: '1rem' }}>
              <h3>{app.student.user.name}</h3>
              <p><strong>Email :</strong> {app.student.user.email}</p>
              {app.motivation_letter && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>Lettre de motivation :</strong>
                  <p style={{ marginTop: '0.5rem' }}>{app.motivation_letter}</p>
                </div>
              )}
              <button 
                className="apply-btn" 
                style={{ marginTop: '1rem' }}
                onClick={() => handleViewProfile(app.student.id)}
              >
                Voir le profil
              </button>
            </div>
          ))
        ) : (
          <p>Aucune candidature pour cette offre pour le moment.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CandidatesList;
