import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';  
import Done from '../assets/Done.png';

const Confirmation = () => {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                <img src={Done} alt="Done" style={{ width: '400px', height: '400px', marginRight: '20px' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
                        <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#000' }}>Demande envoyée avec succès</h2>
                        <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#333' }}>Nous vous recontacterons dans les plus brefs délais.</p>
                        <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#F27438' , fontWeight: 'bold'}}>Darkoum vous remercie...</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Confirmation;
