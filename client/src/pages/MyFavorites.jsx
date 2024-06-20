import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLocationDot, FaHeart } from "react-icons/fa6";
import Navbar from "../components/Navbar1";
import Footer from "../components/footer";
import { IoArrowBackCircle } from "react-icons/io5";
import notFoundImage from "../assets/notfound.png"; // Image de secours
import { useSelector } from "react-redux";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredHouse, setHoveredHouse] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.user._id;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/auth/${userId}`);
        setFavorites(response.data.favorites);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/favorites/remove",
        { userId, houseId: favoriteId },
        { withCredentials: true }
      );

      setFavorites(favorites.filter((favorite) => favorite._id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />

      {favorites.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0", // Fond gris pour toute la page
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "800px",
              padding: "20px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <img
              src={notFoundImage}
              style={{ width: "300px", height: "auto", marginRight: "20px" }}
              alt="Not found"
            />
            <div>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Aucun favori trouvé pour l'instant.
              </p>
              <p>
                Vous n'avez pas encore ajouté de biens à votre liste de favoris.
                Les biens que vous ajouterez à votre liste de favoris seront
                affichés ici.
              </p>
              <div style={{ textAlign: "right" }}>
                <a
                  href="/search"
                  style={{
                    color: "#F27438",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <IoArrowBackCircle
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                  &nbsp; Retour à la recherche{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "120px", // Adjusted for navbar
            margin: "20px",
            position: "relative",
            backgroundColor: "#f0f0f0", // Fond gris pour toute la page
            minHeight: "100vh",
            paddingBottom: "40px", // Ajout d'un peu de padding en bas pour l'espace sous les cartes
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
             Vos biens favoris
          </h1>
         
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {favorites.map((favorite) => {
              const imageUrls = favorite.images ? favorite.images.map(image => image.url) : [];

              return (
                <div
                  key={favorite._id}
                  style={{
                    width: "350px",
                    height: "400px",
                    boxShadow: hoveredHouse === favorite ? "0 0 20px rgba(0, 0, 0, 0.3)" : "0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={() => setHoveredHouse(favorite)}
                  onMouseLeave={() => setHoveredHouse(null)}
                >
                  <Link
                    to={`/HouseDetails/${favorite._id}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    <div style={{ height: "250px", overflow: "hidden" }}>
                      {imageUrls.length > 0 ? (
                        <img
                          src={imageUrls[0]}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          alt="House"
                        />
                      ) : (
                        <img
                          src={notFoundImage}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          alt="Not found"
                        />
                      )}
                    </div>
                    <div style={{ padding: "15px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        {favorite.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "5px", color: "#F27438" }}>
                            <FaLocationDot />
                          </span>
                          <span>{favorite.wilaya}</span>
                        </div>
                        <span style={{ marginTop: "10px", color: "#000" }}>
                          {favorite.price} DA
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeFavorite(favorite._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "white", // Ensure the heart is on a white background
                      borderRadius: "50%", // Optional: Make the background of the heart circular
                      padding: "5px", // Optional: Add some padding to the heart background
                    }}
                  >
                    <FaHeart style={{ color: "#F27438" }} />
                  </button>
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IoArrowBackCircle
              style={{ fontSize: "20px", marginRight: "5px", color: "#F27438" }}
            />
            <Link
              to="/search"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#F27438",
                textDecoration: "none",
              }}
            >
              Retour à la recherche
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyFavorites;
