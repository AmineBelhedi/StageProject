import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import '../../../css/Login.css';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>

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

          <a href="#">Mot de passe oublié ?</a>
          <button type="submit" disabled={processing}>Se connecter</button>
        </form>
      </div>
    </>
  );
};

export default Login;
