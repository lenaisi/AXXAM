import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/footer';
import videoFile from '../assets/vidi.mp4';
import imageFile from '../assets/iim.jpg'; 
import { useSelector } from 'react-redux';

const AboutUss = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div style={styles.container}>
      <div className="navbar">
      {currentUser ? <Navbar1 /> : <Navbar />}
      </div>
      
      <div style={styles.videoContainer}>
        <video style={styles.video} autoPlay muted loop>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.textOverlay}>
          <h1
            style={{ ...styles.text, color: isHovered ? 'orange' : 'white', marginTop: '20px' }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            A propos de nous 
          </h1>
          <div style={styles.space}></div>
          <h2 style={styles.subText}>Darkoum est une plateforme immobilière innovante qui transforme l'achat et la location de biens  immobiliers grâce à la technologie avancée. En intégrant la réalité virtuelle immersive, notre application permet aux utilisateurs de visiter virtuellement des maisons, appartements et villas  avec un niveau de détail exceptionnel. </h2>
          <h2 style={styles.subText}>Cette technologie permet de visualiser, ressentir et personnaliser les espaces avant toute décision d'achat ou de location. Darkoum se consacre à offrir une expérience transparente, engageante et sécurisée, facilitant les transitions résidentielles tout en repoussant les limites de l'immobilier traditionnel. Nous visons à rendre la recherche de la propriété parfaite passionnante et accessible à tous.</h2>
          <h2 style={styles.subText}>Nous vous offrons  egalement la possibilité d'effectuer une demande de visite sur site  en un clin d'œil. Remplissez simplement notre formulaire de demande de visite, et notre équipe dévouée vous contactera pour organiser une expérience en personne que vous n'oublierez jamais.</h2>
        </div>
      </div>
      
      <div style={styles.contentContainer}>
      <img
    src={imageFile}
    alt="Votre image"
    style={isHovered ? { ...styles.image, ...styles.imageHovered } : styles.image}
    onMouseOver={() => setIsHovered(true)}
    onMouseOut={() => setIsHovered(false)}
/>

        <div style={styles.textBesideImage}>
          <h3 style={styles.imageText}>Fondateurs de Darkoum</h3>
          <p style={styles.imageSubText}>Nous sommes Lena Harchaoui et Dalia Belharet, deux étudiantes  en deuxième année de Master en Ingénierie des Systèmes d'Information.  C'est a travers notre parcours académique et notre passion pour l'innovation technologique, nous avons décidé de créer Darkoum , un site dédié à l'exploration et à la découverte de biens immobiliers en integrant la realiate virtuelle .</p>
          <p style={styles.imageSubText}>Notre mission chez Darkoum est de simplifier et d'enrichir l'expérience d'achat et de location de biens immobiliers pour nos clients. En tant qu'étudiantes passionnées par l'informatique, nous nous engageons à offrir une plateforme conviviale et transparente, soutenue par des technologies innovantes, pour aider les acheteurs et les locataires à trouver la propriété parfaite qui répond à leurs besoins et à leurs aspirations.</p>
          <p style={styles.imageSubText}>Rejoignez-nous pour explorer toutes nos fonctionnalités innovantes conçues pour faciliter votre recherche et votre acquisition de biens immobiliers.</p>
        </div>
      </div>
      
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100vh - 80px)',
    overflow: 'hidden',
    height: '150vh', // Modifiez la hauteur ici selon vos besoins
  },
  video: {
    width: '100%', // Pour que la largeur s'adapte automatiquement à la hauteur
    height: '100%', // Ajustez la hauteur à 100% pour remplir le conteneur
    objectFit: 'cover',
    filter: 'brightness(70%)',
  },
  textOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#fff',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 2s ease-in-out',
  },
  text: {
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    margin: 0,
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  subText: {
    fontSize: '1.2rem',
    fontWeight: 'normal',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    margin: '20px 0 0',
  },
  space: {
    height: '30px',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '50px',
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '450px', // Ajustez la taille de l'image selon vos besoins
    height: '300px', // Pour que la hauteur s'ajuste automatiquement à la largeur
    borderRadius: '50%',
    border: '1px solid white', // Ajoutez une bordure blanche autour de l'image
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Ajoutez une ombre légère à l'image
    transition: 'transform 0.3s ease', // Ajoutez une transition pour l'animation de flottement
    transform: 'scale(1)', // Définissez l'échelle de l'image par défaut
},

imageHovered: {
    transform: 'scale(1.1)', // Augmentez l'échelle de l'image au survol
},
  textBesideImage: {
    marginLeft: '50px',
  },
  imageText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0',
  },
  imageSubText: {
    fontSize: '1rem',
    margin: '10px 0 0',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default AboutUss;
