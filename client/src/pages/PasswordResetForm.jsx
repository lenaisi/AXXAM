import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Reset from '../assets/Reset password.png';
import Navbar from '../components/Navbar';
import Footer from '../components/footer'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError('Veuillez entrer une adresse e-mail.');
        return;
      }
  
      if (!validateEmail(email)) {
        setEmailError('Veuillez entrer une adresse e-mail valide se terminant par @gmail.com.');
        return;
      }
  
      setEmailError('');
  
      const response = await axios.post('http://localhost:5000/api/v1/auth/resetpassword', { email });
      console.log(response.data);
      
      navigate('/Verification');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire ', error);
    }
  };
  

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    const gmailRe = /@gmail\.com$/i; // Cette expression régulière vérifie si l'adresse se termine par @gmail.com
    return re.test(email) && gmailRe.test(email);
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
          padding: '20px',
          width: '450px', 
        }}>
          <h2 style={{ marginBottom: '20px' }}>Réinitialisez votre mot de passe</h2>
          <form onSubmit={handleSubmitEmail}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Entrez votre adresse e-mail"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!emailError} 
                  helperText={<span style={{ fontWeight: 'bold', color: '#E50000' }}>{emailError}</span>} 
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#F27438' }}>
                  Envoyer
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
