import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/DARKOUM.png";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        // dispatch(logoutUser());
        navigate('/');
    };

    return (
        <nav style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '80px', 
            backgroundColor: 'white',
            color: 'black',
            padding: '10px 20px', 
            zIndex: 1000,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <Link to="/home">
                <img src={logo} alt="Logo" style={{ marginRight: 20, width: 100, marginTop: 0 }} />
            </Link>
           
            <ul style={{ 
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <li style={{ marginRight:30, fontWeight: 'bold' }}>
                    <Link to="/Home" style={{ textDecoration: 'none', color: 'black', position: 'relative' }}>
                        Accueil
                        <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 2, backgroundColor: 'black', transform: 'scaleX(0)', transition: 'transform 0.3s ease' }}></span>
                    </Link>
                </li>
                <li style={{ marginRight:30, fontWeight: 'bold', marginLeft: 30 }}>
                    <Link to="/NosServices" style={{ textDecoration: 'none', color: 'black', position: 'relative' }}>
                        Nos services
                        <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 2, backgroundColor: 'black', transform: 'scaleX(0)', transition: 'transform 0.3s ease' }}></span>
                    </Link>
                </li>
                <li style={{ fontWeight: 'bold', marginLeft: 30 }}>
                    <Link to="/AboutUs" style={{ textDecoration: 'none', color: 'black', position: 'relative' }}>
                        À propos
                        <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 2, backgroundColor: 'black', transform: 'scaleX(0)', transition: 'transform 0.3s ease' }}></span>
                    </Link>
                </li>
            </ul>

            <button 
                className="login-btn" 
                style={{ 
                    backgroundColor: "#F27438",
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display:'flex',
                    justifyContent: 'space-between'
                }} 
                onClick={handleLogout}
            >
                Se déconnecter
                <LogoutOutlinedIcon style={{marginLeft:"5px"}}/>
            </button>
        </nav>
    );
}

export default Navbar1;