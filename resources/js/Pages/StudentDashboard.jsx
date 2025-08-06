import React, { useState } from 'react';
import InternshipCard from '../Components/InternshipCard';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import Navbar from '../Components/Navbar';
import ProtectedLayout from '../Layouts/ProtectedLayout';
import { usePage, router } from '@inertiajs/react'; 
import Footer from '../Components/Footer';
import '../../css/StudentDashboard.css';

const StudentDashboard = () => {
  const { props } = usePage();
  const internships = props.internships || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [first, setFirst] = useState(0);
  const [rows] = useState(9);

  // ✅ nouvelle fonction pour gérer la candidature
  const handleApply = (internshipId, motivation) => {
    router.post(route('applications.store'), {
      internship_id: internshipId,
      motivation_letter: motivation,
    }, {
      onSuccess: () => {
        alert('Candidature envoyée avec succès !');
      },
      onError: (errors) => {
        alert('Erreur : ' + JSON.stringify(errors));
      }
    });
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation
      ? internship.lieu.toLowerCase().includes(selectedLocation.toLowerCase())
      : true;
    return matchesSearch && matchesLocation;
  });

  const currentPage = filteredInternships.slice(first, first + rows);

  return (
    <ProtectedLayout>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Offres de stage disponibles</h2>
        <div className="filters">
          <span className="p-input-icon-right search-input">
            <i className="pi pi-search" />
            <InputText
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un stage..."
            />
          </span>

          <InputText
            className="dropdown-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            placeholder="Lieu"
          />
        </div>

        <div className="card-grid">
          {currentPage.map((internship) => (
            <InternshipCard
              key={internship.id}
              title={internship.title}
              company={internship.company}
              location={internship.lieu}
              duration={internship.duration}
              type={internship.type}
              logo={internship.company?.logo || null}
              onApply={(motivation) => handleApply(internship.id, motivation)} 
            />
          ))}
        </div>

        <div className="pagination">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredInternships.length}
            onPageChange={(e) => setFirst(e.first)}
          />
        </div>
      </div>
      <Footer />
    </ProtectedLayout>
  );
};

export default StudentDashboard;
