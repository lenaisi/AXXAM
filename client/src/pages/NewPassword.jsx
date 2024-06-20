import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Reset from '../assets/Reset password.png'; 
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [fieldsEmpty, setFieldsEmpty] = useState(false); 
  const [passwordError, setPasswordError] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false); // State for indicating password changed successfully
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setFieldsEmpty(true);
      return;
    }

    setFieldsEmpty(false);

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole.");
      return;
    }

    try {
      axios.post(`http://localhost:5000/api/v1/auth/NewPassword/${id}/${token}`, { password })
        .then(res => {
          if (res.data.Status === "Success") {
            // Mettre à jour l'état pour indiquer que le mot de passe a été modifié avec succès
            setPasswordChanged(true);
            // Rediriger vers la page de connexion après un bref délai
            setTimeout(() => navigate('/sign-in'), 3000);
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe ', error);
    }
  };

  return (
    <div>
      <Navbar /> 
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ marginRight: '50px', textAlign: 'center' }}>
          <img src={Reset} alt="Réinitialisation de mot de passe" style={{ maxWidth: '400px' }} />
        </div>
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '30px',
          width: '500px', 
          textAlign: 'center'
        }}>
          {passwordChanged && (
            <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '20px' }}>
              Mot de passe modifié avec succès
            </div>
          )}
          <h2 style={{ marginBottom: '20px' }}>Réinitialisation du mot de passe</h2>
          <form onSubmit={handleSubmitPassword}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nouveau mot de passe"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirmez le nouveau mot de passe"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!passwordsMatch || fieldsEmpty || !!passwordError}
                  helperText={!passwordsMatch && !fieldsEmpty && (
                    <span style={{ color: '#E50000', fontWeight: 'bold' }}>Les mots de passe ne correspondent pas</span>
                  ) || fieldsEmpty && (
                    <span style={{ color: '#E50000', fontWeight: 'bold' }}>Les champs ne peuvent pas être vides</span>
                  ) || passwordError && (
                    <span style={{ color: '#E50000', fontWeight: 'bold' }}>{passwordError}</span>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#F27438' }}>
                  Réinitialiser le mot de passe
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}
