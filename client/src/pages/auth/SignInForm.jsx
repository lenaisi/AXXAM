import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import Navbar from '../../components/Navbar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../assets/login-pana.png';
import logo from '../../assets/avtr.png';
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";



import "./style.css"

const defaultTheme = createTheme();

export default function SignInSide() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // console.log("isAuthenticated :", isAuthenticated);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      if (!email || !password) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        console.log('res data : ', response.data);
        navigate("/home");
      } else {
        setError(response.data.errors[0].msg);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors[0].msg);
      } else {
        setError("Erreur lors de la connexion. Veuillez réessayer plus tard.");
      }
    }
  };

  const signInWithGoogle = async () => {
      if (loading) return;
      setLoading(true);
      dispatch(loginStart());
      signInWithPopup(auth, provider)
      .then((result) => {
        axios
        .post("http://localhost:5000/api/v1/auth/googleAuth", {
          nomComplet: result.user.displayName,
          email: result.user.email,
        },{
          withCredentials: true
        })
        .then((res) => {
          // console.log("res :", res)
          // console.log("res data :", res.data)
          dispatch(loginSuccess(res.data));
          navigate("/home")
        });
      })
      .catch((error) => {
        dispatch(loginFailure());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    navigate('/ResetPassword');
  };

  // eslint-disable-next-line no-unused-vars
  const handleAddReview = () => {
    // Vérifier si l'utilisateur est connecté
    // if (!isAuthenticated) {
    //   setError("Il faut être connecté pour soumettre un avis.");
    //   return;
    // }
    // Gérer la logique pour soumettre un avis
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }} />

      <Grid container component="main" sx={{ height: '100vh', paddingTop: '64px' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: '200px',
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
            <Typography component="h1" variant="h5" fontWeight="bold">
              Connexion
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                error={error === "Veuillez remplir tous les champs." && email === ''}
                helperText={error === "Veuillez remplir tous les champs." && email === '' ? error : null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={
                  (error === "Veuillez remplir tous les champs." && password === '') ||
                  error === "Mot de passe incorrect."
                }
                helperText={
                  error === "Veuillez remplir tous les champs." && password === ''
                    ? error
                    : error === "Mot de passe incorrect."
                    ? "Mot de passe incorrect."
                    : null
                }
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#FF5733',
                  '&:hover': {
                    bgcolor: '#E64A19',
                  },
                }}
              >
                Se connecter
              </Button>
            
              <div className="google-sign-in">
  <button type="button" onClick={signInWithGoogle} disabled={loading}>
  <p>Continuer avec Google</p>    <FcGoogle size={"25px"} className="iconeGoogle" />
  </button>

</div>

              <Grid container>
                <Grid item xs>
                  <Link to="/ResetPassword" variant="body2" sx={{ color: 'black' }} onClick={handleForgotPassword}>
                    Mot de passe oublié?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/sign-up" variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {"Vous n'avez pas de compte ? Inscrivez-vous"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div className="footer-container">
        
      </div>
    </ThemeProvider>
  );
}