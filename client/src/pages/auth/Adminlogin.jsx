import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import adminImage from '../../assets/Admin.png';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminData } from '../../redux/adminSlice'; 
import { fetchUserData, loginStart, loginSuccess, loginFailure } from '../../redux/adminSlice';



const AdminLogin = () => {
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: ''
    // });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch(); 
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
            "http://localhost:5000/api/v1/admin/signIn",
            { email, password },
            { withCredentials: true }
          );
    
          if (response.status === 200) {
            dispatch(loginSuccess(response.data));
            console.log('res data : ', response.data);
            navigate('/admin');
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

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/v1/admin/signIn', formData);
    //         dispatch(loginSuccess(response.data));
    //         console.log('res data : ', response.data);
    //         // console.log(response.data);
    //         await dispatch(loginSuccess(response.data)); 
    //         // await dispatch(fetchAdminData()); 
    //         navigate('/Admin'); 
    //     } catch (error) {
    //         console.error(error.response.data.errors);
    //     }
    // };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2 style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '550px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>Connexion Administrateur</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={adminImage} alt="Admin" style={{ width: '400px', marginRight: '20px' }} />
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" value={password} 
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
                    </div>
                    <button type="submit" style={{ backgroundColor: '#F27438', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', marginLeft: 'auto' }}>Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
