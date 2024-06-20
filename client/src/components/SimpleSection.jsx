import React from 'react';
import { Link } from 'react-router-dom';
import tizi7 from "../assets/tizi8.jpeg";

const SimpleSection = () => {
  return (
    <div className="simple-section">
      <div className="background"></div>
      <div className="content">
        <p className="main-text">Nous aidons les gens et les maisons à se trouver !</p>
        <div className="view-more-container">
          <Link to="/search" className="view-more-button">Parcourir les biens disponibles</Link>
        </div>
      </div>
      <style>
        {`
          .simple-section {
            position: relative;
            width: 100%;
            height: 300px; 
            overflow: hidden; 
          }

          .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${tizi7});
            background-size: cover;
            background-position: center;
            filter: blur(3px); 
          }

          .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column; /* Flux vertical */
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5); 
          }

          .main-text {
            font-size: 40px; 
            font-weight: bold; 
            color: white; 
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
          }

          .view-more-container {
            margin-top: 20px; /* Ajustement de la marge supérieure */
          }

          .view-more-button {
            padding: 15px 30px; 
            background-color: #F27438;
            color: white;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .view-more-button:hover {
            background-color: #D66330;
          }
        `}
      </style>
    </div>
  );
}

export default SimpleSection;
