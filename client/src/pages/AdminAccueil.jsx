import React from 'react';
import Sidebar from '../components/SideBar'; 
import panel from '../assets/Control Panel-cuate.png';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AdminAccueil({admin}) {
    const { currentAdmin } = useSelector((state) => state.admin);

    console.log('currentAdmin :', currentAdmin);
    console.log('Admin :', admin);

    const styles = {
        adminAccueilContainer: {
            display: 'flex',
            height: '100vh',
            position: 'relative', 
        },
        sidebar: {
            width: '200px',
            position: 'fixed', 
            top: 0,             
            left: 0,          
            height: '100vh',    
        },
        mainContent: {
            marginLeft: '200px',  
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        headerSection: {
            textAlign: 'center',
        },
        headerImage: {
            width: '500px',
            height: 'auto',
            marginBottom: '20px',
            marginLeft: '160px',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        homeLink: {
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        icon: {
            marginRight: '8px',
        }
    };

    return (
        <div style={styles.adminAccueilContainer}>
            <div style={styles.sidebar}>
                <Sidebar />
            </div>
            <div style={styles.mainContent}>
                <div style={styles.headerSection}>
                    <h1 style={styles.title}>Effectuez des actions administratives en toute simplicité dans votre Dashboard.</h1>
                    <img src={panel} alt="" style={styles.headerImage} />
                </div>
            </div>
            <Link to="/" style={styles.homeLink}>
                <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                Retour à la page d'accueil
            </Link>
        </div>
    );
}

export default AdminAccueil;
