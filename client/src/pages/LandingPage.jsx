import React from 'react';
import MainSection from '../components/MainSection';
import Navbar from '../components/Navbar';
import Navbar1 from "../components/Navbar1";
import Footer from '../components/footer';
import NosServices from '../components/NosServices';
import AboutUs from '../components/AboutUs';
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
   
      <div className="navbar"> 
      {currentUser ? <Navbar1 /> : <Navbar />}
      </div>
      <MainSection />
      <div className="space-between-sections" style={styles.space}></div>
      <div className="nos-services">
        <NosServices />
      </div>
      <div className="space-between-sections" style={styles.space}></div>
      <div className="about-us">
        <AboutUs />
      </div>
      <div className="space-between-sections" style={styles.space}></div>
      <div className="footer-container"> 
        <Footer />
      </div>
    </div>
  );
}

const styles = {
  space: {
    height: '50px', 
  },
};

export default LandingPage;