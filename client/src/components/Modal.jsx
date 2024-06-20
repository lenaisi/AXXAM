import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/sign-in');
    };

    const handleAdminClick = () => {
        navigate('/adminlogin');
    };

    return (
        <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                color: 'black', 
                padding: '20px',
                borderRadius: '5px',
                width: '300px', 
                textAlign: 'center'
            }}>
                
                <button onClick={onClose} style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    color: 'black'
                }}>
                    &times;
                </button>

                {/* Titre */}
                <h2>Se connecter en tant que :</h2>

                {/* Options */}
                <div>
                    <button 
                        onClick={handleAdminClick} 
                        style={{
                            backgroundColor: '#F27438', // Fond orange
                            color: 'white', // Texte blanc
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 15px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        Admin
                    </button>
                    <button 
                        onClick={handleUserClick} 
                        style={{
                            backgroundColor: '#F27438', // Fond orange
                            color: 'white', // Texte blanc
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 15px',
                            cursor: 'pointer'
                        }}
                    >
                        Utilisateur
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
