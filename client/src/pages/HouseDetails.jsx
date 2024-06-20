import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaLocationDot, FaImages, FaCoins } from "react-icons/fa6";
import { IoArrowBackCircle, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { PiVirtualRealityBold } from "react-icons/pi";
import Navbar from '../components/Navbar';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/footer';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

Modal.setAppElement('#root');

const HouseDetails = () => {

  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/admin/houses/${id}`);
        setHouse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === house.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? house.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNextImage, handlePrevImage]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
         {currentUser ? <Navbar1 /> : <Navbar />  }
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>Chargement en cours...</div>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "50px", color: "#F27438" }} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const createdAtDate = new Date(house.createdAt).toLocaleDateString();

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
         {currentUser ? <Navbar1 /> : <Navbar />}
      <div style={{ marginTop: "50px", fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <section style={{ marginBottom: "20px", position: "relative" }}>
          {house.images && house.images.length > 0 && (
            <div style={{ position: "relative" }}>
              <img
                src={house.images[0].url}
                style={{
                  width: "100vw",
                  height: "auto",
                  maxHeight: "80vh",
                  display: "block",
                  borderRadius: "10px",
                  margin: "0 auto"
                }}
                alt="House 1"
              />
              <div style={{
                position: "absolute",
                bottom: "10px",
                right: "20px",
                display: "flex",
                justifyContent: "flex-end"
              }}>
                <button
                  onClick={() => setModalIsOpen(true)}
                  style={{
                    backgroundColor: "black",
                    color: "#FFF",
                    padding: "10px 20px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px"
                  }}
                >
                  <FaImages style={{ marginRight: "5px" }} />
                  Afficher les photos
                </button>
                <Link to={`/houses/${id}/visitt`} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      backgroundColor: "#F27438",
                      color: "#FFF",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px"
                    }}
                  >
                    <PiVirtualRealityBold style={{ marginRight: "5px" }} />
                    Visite 3D
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
        <div style={{ marginBottom: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#000", marginBottom: "10px" }}>{house.title}</h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <p style={{ fontSize: "24px", display: "flex", alignItems: "center", color: "#000", fontWeight: "bold" }}>
              <FaLocationDot style={{ marginRight: "5px", color: "#F27438" }} />
              {house.wilaya}
            </p>
            {house.locationMapLink && (
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <a href={house.locationMapLink} target="_blank" rel="noopener noreferrer" style={{ 
                  fontFamily: "Verdana, sans-serif", 
                  fontWeight: "bold", 
                  color: "#F27438", 
                  textDecoration: "underline",
                  marginLeft: "-200px" ,
                  fontSize: "18px",
                }}>
                  Voir sur la carte
                </a>
              </div>
            )}
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "24px", color: "#000", fontWeight: "bold", marginBottom: "10px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FaCoins style={{ color: '#F27438', marginRight: '8px' }} />
                {house.price} DA
              </p>
              <Link to="/visit" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: "#000", color: "#FFF", padding: "10px 20px", fontSize: "20px", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                  Visite sur site
                </button>
              </Link>
            </div>
          </div>
          <p style={{ fontSize: "24px", marginBottom: "10px", color: "#000" }}>
            <strong>Type de bien:</strong> {house.typeBien}
          </p>
          <p style={{ fontSize: "22px", marginBottom: "20px", color: "#000" }}>
            <strong>Type d'annonce:</strong> {house.typeAnnonce}
          </p>
          <p style={{ fontSize: "22px", marginBottom: "10px", color: "#000" }}>
            <strong>Ce bien été ajouté le </strong> {createdAtDate}
          </p>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#000", marginBottom: "10px" }}>Description</h2>
          <p style={{ fontSize: "18px", color: "#000", fontFamily: "Verdana, sans-serif" }}>{house.description}</p>
        </div>
        <div style={{ textAlign: "right", marginTop: "50px" }}>
          <Link to="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <IoArrowBackCircle style={{ fontSize: "24px", marginRight: "10px" }} />
            <span style={{ fontSize: "18px", color: "#000", fontWeight: "bold" }}>Retour à la recherche</span>
          </Link>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            background: 'rgba(0, 0, 0, 0.5)',
            top: '30%', 
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -30%)',
            width: '80%',
            maxWidth: '800px',
            height: '80vh', 
            border: 'none',
            padding: '20px',
            borderRadius: '10px',
            overflow: 'hidden' 
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', 
            zIndex: '1000' 
          }
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "80%" }}>
          {house.images && house.images.length > 0 && (
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={house.images[currentImageIndex].url}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "10px"
                }}
                alt={`House ${currentImageIndex + 1}`}
              />
              <button
                onClick={handlePrevImage}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                <IoArrowBack style={{ fontSize: "24px" }} />
              </button>
              <button
                onClick={handleNextImage}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                <IoArrowForward style={{ fontSize: "24px" }} />
              </button>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {house.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
                cursor: "pointer",
                border: currentImageIndex === index ? '2px solid #F27438' : 'none',
                objectFit: "cover"
              }}
              alt={`House thumbnail ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HouseDetails;
