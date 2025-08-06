import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import '../../css/CompanyProfile.css'; 
import Footer from '../Components/Footer';

const CompanyProfile = ({ company }) => {
  const { flash } = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    website: company?.website || '',
    logo: null,
    description: company?.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('website', data.website);
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    post(route('company.update'), formData,{
      forceFormData: true,
      preserveScroll: true,
    });
  };

  useEffect(() => {
    if (flash?.success) {
      alert(flash.success);
    }
  }, [flash]);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="profile-container" enctype="multipart/form-data">
        <h2 className="section-title">Profil Entreprise</h2>

        <div className="form-group">
          <label>Site web de l’entreprise</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => setData('website', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setData('logo', e.target.files[0])}
          />
        </div>

        <div className="btn-actions">
          <button type="submit" className="btn-save" disabled={processing}>
            {processing ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => reset()}
          >
            Réinitialiser
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default CompanyProfile;
