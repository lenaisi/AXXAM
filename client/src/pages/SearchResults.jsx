import React, { useEffect, useState } from 'react';
import { FaLocationDot, FaHeart, FaArrowLeft } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import sorry from '../assets/sorry.png';
import Navbar from '../components/Navbar';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';

const SearchResults = () => {
  const location = useLocation();
  const { houses, loading } = location.state || { houses: [], loading: false };
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser ? currentUser.user._id : null;
  const [favorites, setFavorites] = useState([]);
  const [hoveredHouse, setHoveredHouse] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/auth/${userId}`);
        setFavorites(response.data.favorites.map((fav) => fav._id));
      } catch (err) {
        console.error("Erreur lors de la récupération des favoris:", err);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const handleUpdateFavorite = async (houseId) => {
    try {
      if (!currentUser) {
        toast.error(
          <span style={{ fontSize: "16px" }}>
            Vous devez être connecté pour ajouter ce bien à vos favoris.{" "}
            <Link to="/sign-in" style={{ color: "#F27438", fontWeight: "bold" }}>
              Connectez-vous ici
            </Link>
          </span>,
          { autoClose: 8000 }
        );
        return;
      }

      const action = favorites.includes(houseId) ? "remove" : "add";

      await axios.put(
        `http://localhost:5000/api/v1/auth/${userId}/updateFav`,
        { houseId, action },
        { withCredentials: true }
      );

      if (action === "remove") {
        setFavorites(favorites.filter((fav) => fav !== houseId));
        toast.error(
          <span style={{ color: "red" }}>
            Ce bien a été supprimé de vos favoris !
          </span>
        );
      } else {
        setFavorites([...favorites, houseId]);
        toast.success("Ce bien a été ajouté à vos favoris !");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris:", err);
      toast.error("Une erreur est survenue lors de la mise à jour des favoris.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>Chargement en cours...</div>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "50px", color: "#F27438" }} />
      </div>
    );
  }

  if (!Array.isArray(houses) || houses.length === 0) {
    return (
      <div>
        {currentUser ? <Navbar1 /> : <Navbar />}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '800px', padding: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', background: 'white' }}>
            <img src={sorry} style={{ width: '300px', height: 'auto', marginRight: '20px' }} alt="Sorry" />
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Désolé pour le moment, il n'y a pas de biens correspondant à vos critères de recherche.</p>
              <p>Revenez souvent pour découvrir de nouvelles annonces !</p>
              <p>Modifiez vos critères de recherche pour obtenir plus de résultats.</p>
              <Link to="/home" style={{ color: '#F27438', textDecoration: 'none', fontWeight: 'bold' }}>
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Retour à la page d'accueil
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      {currentUser ? <Navbar1 /> : <Navbar />}
      <ToastContainer />
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "40px" }}>Résultats de la recherche</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {houses.map((house) => (
            <div key={house._id} style={{ marginRight: "20px", marginBottom: "20px", width: "350px", height: "400px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
              <Link to={`/HouseDetails/${house._id}`} style={{ textDecoration: "none", color: "#333" }}>
                <div style={{ height: "250px", overflow: "hidden" }}>
                  {house.images && house.images.length > 0 ? (
                    <img src={house.images[0].url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="House" />
                  ) : (
                    <img src={sorry} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="No Image Available" />
                  )}
                </div>
                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{house.title}</h3>
                  <p style={{ marginBottom: "10px", display: "inline-flex", alignItems: "center" }}>
                    <span style={{ marginRight: "5px", color: "#F27438" }}>
                      <FaLocationDot />
                    </span>
                    {house.wilaya}
                  </p>
                  <p>{house.price} DA</p>
                </div>
              </Link>
              <button
                onClick={() => handleUpdateFavorite(house._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                {favorites.includes(house._id) ? (
                  <FaHeart style={{ color: "#F27438" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' , marginLeft: '900px'}}>
          <Link
            to="/home"
            style={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
