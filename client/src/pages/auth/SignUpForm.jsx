import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar'; 
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import avatarImage from '../../assets/avatar.png'; 

const defaultTheme = createTheme();

const SignUpForm = () => {
  const [nomComplet, setNomComplet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inscriptionReussie, setInscriptionReussie] = useState(false); // Nouvel état pour contrôler la visibilité du message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        nomComplet,
        email,
        password,
        confirmPassword,
        phoneNumber,
      },
      {withCredentials: true});
      
      console.log('Réponse du serveur:', response.data);
      setInscriptionReussie(true); // Définir l'état de l'inscription comme réussie
      navigate('/sign-in');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }} />
      
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 0,
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '20px', 
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={avatarImage} alt="Avatar" />
          <Typography component="h1" variant="h5" fontWeight="bold">
            Inscription
          </Typography>
          {inscriptionReussie && (
            <Typography variant="body1" color="primary" align="center">
              Inscription réussie. Vous pouvez vous connecter pour accéder à votre compte.
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="nomComplet"
                  required
                  fullWidth
                  id="nomComplet"
                  label="Nom Complet"
                  autoFocus
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Numéro de téléphone"
                  type="tel"
                  id="phoneNumber"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreeToTerms" color="primary" />}
                  label="J'accepte les conditions générales et la politique de confidentialité"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#F27438',
                '&:hover': {
                  bgcolor: '#E64A19',
                },
              }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                  {"Vous avez déjà un compte ? Connectez-vous"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpForm;
