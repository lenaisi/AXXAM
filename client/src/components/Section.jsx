import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tizi1 from "../assets/ev.PNG";
import tizi2 from "../assets/tizi10.PNG";
import tizi3 from "../assets/yy.jpg";
import TypeAnnonce from "../components/TypeAnnonce";
import PriceSelector from "../components/PriceRangeSelector";
import HouseTypeSelector from "../components/HouseTypeSelector";
import WilayaSelector from "../components/WilayaSelector";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
const Section = () => {
  const [formData, setFormData] = useState({
    typeAnnonce: "",
    typeBien: "",
    wilaya: "",
    priceMin: "",
    priceMax: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/search",
        formData
      );
      if (response.data && Array.isArray(response.data)) {
        navigate("/search-results", { state: { houses: response.data } });
      } else {
        navigate("/search-results", { state: { houses: [] } });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des maisons :", error);
      navigate("/search-results", { state: { houses: [] } });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="section">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <TypeAnnonce
                onChange={(value) =>
                  setFormData({ ...formData, typeAnnonce: value })
                }
              />
            </div>
            <div className="form-group">
              <HouseTypeSelector
                onChange={(value) =>
                  setFormData({ ...formData, typeBien: value })
                }
              />
            </div>
            <div className="form-group">
              <WilayaSelector
                onChange={(value) =>
                  setFormData({ ...formData, wilaya: value })
                }
              />
            </div>
          </div>
          <div className="form-group price-selector">
            <PriceSelector
              onChange={(min, max) =>
                setFormData({ ...formData, priceMin: min, priceMax: max })
              }
            />
          </div>
          <button className="submit-button" type="submit" style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <SearchIcon/>
            Rechercher
          </button>
        </form>
      </div>

      <Slider {...settings}>
        <div>
          <div className="background-container">
            <img src={tizi3} alt="background" className="background-img" />
          </div>
        </div>
        <div>
          <div className="background-container">
            <img src={tizi2} alt="background" className="background-img" />
          </div>
        </div>
        <div>
          <div className="background-container">
            <img src={tizi3} alt="background" className="background-img" />
          </div>
        </div>
      </Slider>

      <style>
        {`
          .section {
            position: relative;
          }

          .background-container {
  
            position: relative;
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .background-img {
          
            width: auto;
            max-width: 100%;
            max-height: 800px; 
            margin: auto;
          }

          .form-container {
            position: absolute;
            top: 31%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 800px;
            background-color: rgba(249, 249, 249, 0.8);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            z-index: 1;
          }

          .form {
            display: flex;
            flex-direction: column;
          }

          .form-row {
            display: flex;
            flex-direction: row;
            margin-bottom: 20px;
          }

          .form-group {
            margin-right: 20px;
          }

          .price-selector {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }

          .price-selector label {
            margin-right: 10px;
          }

          .price-selector input {
            width: 45%;
            padding: 5px;
          }

          .price-selector input#max-price {
            margin-left: 20px; /* Add space between the min and max price fields */
          }

          .submit-button {
            padding: 10px 20px;
            background-color: #F27438;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #D66330;
          }
        `}
      </style>
    </section>
  );
};

export default Section;