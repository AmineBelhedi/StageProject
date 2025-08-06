import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../../css/StudentProfile.css';

const StudentProfile = ({ student }) => {
  const { flash, errors } = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    phone: student?.phone || '',
    school: student?.school || '',
    level: student?.level || '',
    year: student?.year || '',
    skills: student?.skills || [],
    newSkill: '',
    experience: student?.experience || '',
    duree: student?.duree || '',
    experience_description: student?.experience_description || '',
    description: student?.description || '',
    about: student?.about || '',
    cv: null,
  });

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
  }, [flash]);

  const addSkill = () => {
    if (data.newSkill && !data.skills.includes(data.newSkill)) {
      setData('skills', [...data.skills, data.newSkill]);
      setData('newSkill', '');
    }
  };

  const removeSkill = (skillToRemove) => {
    setData('skills', data.skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'skills') {
        formData.append('skills', JSON.stringify(value));
      } else if (key === 'cv' && value) {
        formData.append('cv', value);
      } else if (key !== 'newSkill') {
        formData.append(key, value);
      }
    });

    post(route('student.update'), {
      data: formData,
      forceFormData: true,
    });
  };

  // Fonction pour réinitialiser tous les champs à vide
  const handleReset = () => {
    setData({
      phone: '',
      school: '',
      level: '',
      year: '',
      skills: [],
      newSkill: '',
      experience: '',
      duree: '',
      experience_description: '',
      description: '',
      about: '',
      cv: null,
    });
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="profile-container" encType="multipart/form-data">
        <h2 className="section-title">Mon Profil Étudiant</h2>

        {/* Informations personnelles */}
        <section className="section">
          <h3>Informations personnelles</h3>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
        </section>

        {/* Formation */}
        <section className="section">
          <h3>Formation</h3>
          <div className="form-group">
            <label>Établissement</label>
            <input
              type="text"
              value={data.school}
              onChange={(e) => setData('school', e.target.value)}
            />
            {errors.school && <div className="error">{errors.school}</div>}
          </div>
          <div className="form-group">
            <label>Niveau</label>
            <input
              type="text"
              value={data.level}
              onChange={(e) => setData('level', e.target.value)}
            />
            {errors.level && <div className="error">{errors.level}</div>}
          </div>
          <div className="form-group">
            <label>Année d'étude</label>
            <input
              type="text"
              value={data.year}
              onChange={(e) => setData('year', e.target.value)}
            />
            {errors.year && <div className="error">{errors.year}</div>}
          </div>
        </section>

        {/* Compétences */}
        <section className="section">
          <h3>Compétences</h3>

          <div className="skills-container">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="skill-chip"
                onClick={() => removeSkill(skill)}
              >
                {skill} ✕
              </span>
            ))}
          </div>

          <div className="skill-input-wrapper">
            <input
              type="text"
              value={data.newSkill}
              onChange={(e) => setData('newSkill', e.target.value)}
              placeholder="Nouvelle compétence"
            />
            <button type="button" onClick={addSkill}>Ajouter</button>
          </div>

          {errors.skills && <div className="error">{errors.skills}</div>}
        </section>

        {/* Expériences */}
        <section className="section">
          <h3>Expériences</h3>
          <div className="form-group">
            <label>Titre de l'expérience</label>
            <input
              type="text"
              value={data.experience}
              onChange={(e) => setData('experience', e.target.value)}
            />
            {errors.experience && <div className="error">{errors.experience}</div>}
          </div>
          <div className="form-group">
            <label>Durée</label>
            <input
              type="text"
              value={data.duree}
              onChange={(e) => setData('duree', e.target.value)}
            />
            {errors.duree && <div className="error">{errors.duree}</div>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={data.experience_description}
              onChange={(e) => setData('experience_description', e.target.value)}
            />
            {errors.experience_description && <div className="error">{errors.experience_description}</div>}
          </div>
        </section>

        {/* Documents */}
        <section className="section">
          <h3>Documents</h3>
          <div className="form-group">
            <label>CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setData('cv', e.target.files[0] || null)}
            />
            {errors.cv && <div className="error">{errors.cv}</div>}
          </div>
        </section>

        {/* À propos de moi */}
        <section className="section">
          <h3>À propos de moi</h3>
          <textarea
            className="about-textarea"
            value={data.about}
            onChange={(e) => setData('about', e.target.value)}
            placeholder="Parle un peu de toi, de ton parcours et de tes ambitions..."
            rows={5}
          />
          {errors.about && <div className="error">{errors.about}</div>}
        </section>

        <div className="btn-actions">
          <button type="submit" disabled={processing} className="btn-save">
            Enregistrer
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Réinitialiser
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default StudentProfile;
