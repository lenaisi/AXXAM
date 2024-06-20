import React from 'react';
import Reset from '../assets/mail.svg'; 
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

export default function CodeVerificationForm() {

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center', padding: '0 20px' }}>
          <h2 style={{ marginBottom: '0px', marginTop: '150px' ,color: '#F27438', fontWeight: 'bold'}}>Pour réinitialiser votre mot de passe, veuillez accéder à votre boîte mail. Vous y trouverez un lien sécurisé qui vous permettra de procéder à la réinitialisation de votre mot de passe en toute simplicité.</h2>
        </div>
        <img src={Reset} alt="Réinitialisation de mot de passe" style={{ maxWidth: '400px', margin: 'auto' }} />
      </div>
      <Footer /> 
    </div>
  );
}
