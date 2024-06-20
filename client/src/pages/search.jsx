import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaLocationDot, FaHeart, FaRegHeart, FaAngleDown, FaCoins } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import Navbar1 from "../components/Navbar1";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';

const Search = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [hoveredHouse, setHoveredHouse] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser ? currentUser.user._id : null;

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/houses");
        setHouses(response.data);
        console.log("Fetched houses:", response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = async (houseId) => {
    try {
      if (favorites.includes(houseId)) {
        await axios.post(
          "http://localhost:5000/api/v1/auth/favorites/remove",
          { userId, houseId },
          { withCredentials: true }
        );
        setFavorites(favorites.filter((fav) => fav !== houseId));
        toast.error(<span style={{ color: "red" }}>Ce bien a été supprimé de vos favoris !</span>);
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/auth/favorites/add",
          { userId, houseId },
          { withCredentials: true }
        );
        setFavorites([...favorites, houseId]);
        toast.success("Ce bien a été ajouté à votre liste de favoris !");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris:", err);
      toast.error("Une erreur est survenue lors de la mise à jour des favoris.");
    }
  };

  const handleUpdateFavorite = async (houseId) => {
    try {
      if (!currentUser) {
        toast.error(
          <span style={{ fontSize: "16px" }}>
            Vous devez être connecté pour ajouter ce bien à vos favoris.{" "}
            <Link to="/sign-in" style={{ color: "#F27438" }}>
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
        toast.success("Ce bien a été ajouté à votre liste de favoris !");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris:", err);
      toast.error("Une erreur est survenue lors de la mise à jour des favoris.");
    }
  };

  const sortHouses = (houses) => {
    switch (sortBy) {
      case "recent":
        return houses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "expensive":
        return houses.sort((a, b) => b.price - a.price);
      case "cheap":
        return houses.sort((a, b) => a.price - b.price);
      case "old":
        return houses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return houses;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
        <Navbar />
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>Chargement en cours...</div>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "50px", color: "#F27438" }} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const groupedHouses = houses.reduce((acc, house) => {
    if (!acc[house.typeBien]) {
      acc[house.typeBien] = [];
    }
    acc[house.typeBien].push(house);
    return acc;
  }, {});


  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        paddingTop: "120px",
      }}
    >
      {currentUser ? <Navbar1 /> : <Navbar />  }
      <ToastContainer />
      <ToastContainer />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>{houses.length} biens trouvés <HomeIcon style={{marginLeft:"5px"}}/></h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Trier par :</span>
          <div style={{ position: "relative", marginLeft: "10px" }}>
            <div onClick={() => setShowSortOptions(!showSortOptions)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <span>{sortBy === "recent" ? "Les + récents" : sortBy === "expensive" ? "Les + chers" : sortBy === "cheap" ? "Les - chers" : "Les - récents"}</span>
              <FaAngleDown style={{ marginLeft: "5px" }} />
            </div>
            {showSortOptions && (
              <div style={{ position: "absolute", backgroundColor: "white", borderRadius: "5px", boxShadow: "0 0 5px rgba(0,0,0,0.2)", top: "100%", right: "0", zIndex: "100" }}>
                <div onClick={() => { setSortBy("recent"); setShowSortOptions(false); }} style={{ padding: "10px", cursor: "pointer" }}>Les + récents</div>
                <div onClick={() => { setSortBy("expensive"); setShowSortOptions(false); }} style={{ padding: "10px", cursor: "pointer" }}>Les + chers</div>
                <div onClick={() => { setSortBy("cheap"); setShowSortOptions(false); }} style={{ padding: "10px", cursor: "pointer" }}>Les - chers</div>
                <div onClick={() => { setSortBy("old"); setShowSortOptions(false); }} style={{ padding: "10px", cursor: "pointer" }}>Les - récents</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {Object.keys(groupedHouses).map((category) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              marginBottom: "20px",
              textTransform: "capitalize",
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {sortHouses(groupedHouses[category]).map((house) => {
              const imageUrls = house.images ? house.images.map(image => image.url) : [];
              return (
                <div
                key={house._id}
                style={{
                  width: "350px",
                  height: "400px",
                  boxShadow: hoveredHouse === house ? "0 0 20px rgba(0, 0, 0, 0.3)" : "0 0 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "box-shadow 0.3s",
                  marginRight: "25px",
                }}
                onMouseEnter={() => setHoveredHouse(house)}
                onMouseLeave={() => setHoveredHouse(null)}
              >
                <Link
                  to={`/HouseDetails/${house._id}`}
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  <div style={{ height: "250px", overflow: "hidden" }}>
                    {imageUrls.length > 0 && (
                      <img
                        src={imageUrls[0]}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        alt="House"
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
                      {house.title}
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
  <span>{house.wilaya}</span>
</div>
<div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
  <span style={{ marginRight: "5px", color: "#F27438" }}>
    <FaCoins />
  </span>
  <span style={{ color: "#000", fontWeight: "bold" }}>
    {house.price} DA
  </span>
</div>


                    </div>
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
                    <FaRegHeart />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    ))}
{currentUser && (
    <div
      style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}
    >
      <Link
        to="/myfavorites"
        style={{
          backgroundColor: "#F27438",
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          padding: "10px  20px",
          borderRadius: "5px",
          textDecoration: "none",
          marginLeft: "600px",
          marginTop: "100px",
        }}
      >
        Accéder à mes favoris <FavoriteBorderIcon style={{marginLeft:"5px"}}/>
      </Link>
    </div>
    )}

    <Footer />
  </div>
);
};

export default Search;
