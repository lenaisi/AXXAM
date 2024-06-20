import React from 'react';
import { Link } from 'react-router-dom';
import home1 from "../assets/lpp.jpg" 
import home2 from "../assets/tigzirt.jpg"
import home3 from "../assets/villa.jpeg"

const Properties = () => {
  return (
    <div className="properties" style={{ marginTop: '-0px' }}>
      <h2 className="properties-title">Nos ventes récentes</h2>
      <div className="property-list">
        <div className="property-card">
          <Link to="" className="property-link">
            <div className="card-content">
              <div className="property-image-container">
                <img src={home1} alt="home1" className="property-image" />
                <span className="badge badge-sold">Vendu</span>
              </div>
              <h3 className="property-title">Logement promotionnel public LPP, Bouira</h3>
              <p className="property-price"> 1200000000,000 DA</p>
            </div>
          </Link>
        </div>
        <div className="property-card">
          <Link to="" className="property-link">
            <div className="card-content">
              <div className="property-image-container">
                <img src={home2} alt="home2" className="property-image" />
                <span className="badge badge-sold">Vendu</span>
              </div>
              <h3 className="property-title">Villa à Tigzirt</h3>
              <p className="property-price"> 3000000000,000 DA</p>
            </div>
          </Link>
        </div>
        <div className="property-card">
          <Link to="" className="property-link">
            <div className="card-content">
              <div className="property-image-container">
                <img src={home3} alt="home3" className="property-image" />
                <span className="badge badge-sold">Vendu</span>
              </div>
              <h3 className="property-title">Villa à Azazga</h3>
              <p className="property-price">5500000000,000 DA</p>
            </div>
          </Link>
        </div>
      </div>
      

      <style>
        {`
          .properties {
            padding: 50px 0;
            text-align: center;
          }

          .properties-title {
            font-size: 2.5em;
            font-weight: bold;
            color: #F27438;
            margin-bottom: 30px;
            
          }

          .properties-title:hover {
            color: #F27438 /* Changement de couleur au survol */
          }

          .property-list {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }

          .property-card {
            width: 250px;
            margin-bottom: 20px;
            background-color: #e0e0e0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            
            position: relative; /* Nécessaire pour positionner le badge */
          }

          .property-link {
            text-decoration: none;
            color: inherit;
          }

          .card-content {
            padding: 12px;
           
          }

          .property-image-container {
            position: relative;
          }

          .property-image {
            width: 100%;
            height: 160px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 10px;
            transition: transform 0.3s ease;
          }

          .badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #F27438;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            transform: rotate(45deg); 
            
          }

          .property-title {
            font-weight: bold;
            font-size: 1.2em;
            margin-top: 10px;
          }

          .property-card:hover .property-image {
            transform: scale(1.05);
          }

          .view-more-container {
            margin-top: 80px;
          }

          .view-more-button {
            background-color: #F27438;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
}

export default Properties;
