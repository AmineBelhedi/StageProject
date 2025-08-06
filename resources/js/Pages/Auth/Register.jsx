import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import '../../../css/Register.css';

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Créer un compte</h1>
          
          <input
            type="text"
            placeholder="Nom"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="password"
            placeholder="Mot de passe"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <select
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
            required
            className="role-select"
          >
            <option value="">Choisir un rôle</option>
            <option value="student">Étudiant</option>
            <option value="company">Société</option>
          </select>
          {errors.role && <div className="error">{errors.role}</div>}

          <button type="submit" disabled={processing}>S'inscrire</button>
        </form>
      </div>
    </>
  );
};

export default Register;
