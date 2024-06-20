import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const [showFooter, setShowFooter] = useState(true);
  const [hovered, setHovered] = useState(false);

  const footerStyle = {
    background: "#F27438", 
    color: '#ffffff',
    padding: '40px 0',
    textAlign: 'center',
    position: 'relative',
    transition: 'background-color 0.3s',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    display: showFooter ? 'block' : 'none', 
  };

  const columnStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  };

  const columnTitleStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    transition: 'color 0.3s',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <div style={{ position: 'relative' }}>
      <footer
        style={footerStyle}
        className="footer"
        id="footer"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <div className="footer-content" style={{ justifyContent: 'center' }}>
          <div style={columnStyle}>
            <div style={linkStyle}>
              <FaMapMarkerAlt style={iconStyle} />
              <p style={{ marginBottom: '0', marginRight: '20px' }}>Avenue ABBANE Remdane, Tizi Ouzou, Algeria</p>
            </div>
            <div style={linkStyle}>
              <FaPhone style={iconStyle} />
              <p style={{ marginBottom: '0', marginRight: '20px' }}>+2136456788009</p>
            </div>
            <div style={linkStyle}>
              <FaEnvelope style={iconStyle} />
              <p style={{ marginBottom: '0' }}>Darkoum2024@gmail.com</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #ffffff', paddingTop: '10px', marginTop: '20px' }}>
          <p>&copy; 2024 Tizi Home. Tous droits réservés.</p>
        </div>
      </footer>
      <button
        onClick={toggleFooter}
        style={{
          position: 'absolute',
          top: showFooter ? '-40px' : '10px',
          right: '50%',
          transform: 'translateX(50%)',
          color: '#F27438',
          border: 'none',
          width: '200px',
          height: '40px',
          cursor: 'pointer',
          zIndex: '999',
          backgroundColor: 'transparent',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showFooter ? (
          <FaAngleUp size={24} />
        ) : (
          <>
            <FaAngleDown size={24} />
            <span style={{ marginLeft: '10px' }}>CONTACTEZ-NOUS</span>
          </>
        )}
      </button>
    </div>
  );
}

export default Footer;
