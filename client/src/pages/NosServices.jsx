import React from 'react';
import Navbar from '../components/Navbar';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/footer';
import Propertie from '../components/propertie';
import { useSelector } from 'react-redux';


const NosServices = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="navbar"> 
      {currentUser ? <Navbar1 /> : <Navbar />}
      </div>

      <div className="propertie"> 
        <Propertie />
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

export default NosServices;