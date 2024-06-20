import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import home1 from "../assets/q11.jpeg";
import home2 from "../assets/q12.jpeg";
import home3 from "../assets/q13.jpeg";

const Propertie = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Trigger animation when the component mounts
    setAnimateCards(true);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleTitleHover = () => {
    setIsTitleHovered(true);
  };

  const handleTitleLeave = () => {
    setIsTitleHovered(false);
  };

  return (
    <div className="properties" style={{ marginTop: '50px' }}>
      <h2 
        className={`properties-title ${isTitleHovered ? 'orange' : ''}`} 
        style={{ marginBottom: '50px' }}
        onMouseEnter={handleTitleHover}
        onMouseLeave={handleTitleLeave}
      >
        Nos Services
      </h2>
      <div className={`property-list ${animateCards ? 'animate' : ''}`}>
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 0 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home1} alt="Visite virtuelle" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Visite Virtuelle</p>
                <p className="property-description">
                Chez Darkoum, nous nous efforçons de vous offrir la meilleure expérience pour trouver votre bien immobilier en Algérie. Pour faciliter votre recherche, nous sommes ravis de vous proposer des visites virtuelles en 3D de nos propriétés en vente et en location.

Explorez chaque pièce, appréciez les détails et visualisez votre futur chez-vous depuis le confort de votre domicile. Nos visites 3D vous permettent de vous immerger dans les espaces et de prendre des décisions éclairées, tout en gagnant du temps.

N'attendez plus, plongez dans nos visites virtuelles et découvrez la maison ou l'appartement de vos rêves dès aujourd'hui !
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 1 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home2} alt="Bon plan" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Bon Plan</p>
                <p className="property-description">
                Chez Darkoum, nous sommes déterminés à vous offrir les meilleures opportunités pour votre investissement immobilier en Algérie. C'est pourquoi nous vous proposons une sélection exclusive de bons plans immobiliers.

Profitez d'offres exceptionnelles sur une large gamme de biens, que ce soit pour la vente ou la location. Des appartements aux maisons, des villas , nous avons des options pour répondre à tous vos besoins et à votre budget.

Ne manquez pas cette occasion de réaliser une affaire avantageuse et de concrétiser vos projets immobiliers avec succès. Explorez nos bons plans dès maintenant et trouvez la perle rare qui correspond à vos attentes !
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 2 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home3} alt="Votre maison" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Votre Maison</p>
                <p className="property-description">
                Avec Darkoum, la recherche de votre bien immobilier idéal devient plus facile que jamais. Notre plateforme intuitive vous permet de rechercher selon vos critères spécifiques, vous aidant à trouver rapidement ce que vous cherchez.

Que vous recherchiez un appartement moderne en centre-ville, une maison spacieuse en périphérie, nous avons ce qu'il vous faut. Utilisez notre formulaire de recherche avancés pour affiner votre recherche en fonction de votre budget, des commodités et bien plus encore.

Ne perdez plus de temps et trouvez votre bien idéal en un rien de temps et réalisez votre rêve immobilier dès aujourd'hui !


                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>
        {`
          .properties {
            padding: 50px 0;
            text-align: center;
            background-color: #f5f5f5;
          }

          .properties-title {
            font-size: 3em;
            font-weight: bold;
            color: #333;
            transition: color 0.3s ease;
          }

          .properties-title.orange {
            color: orange;
          }

          .property-list {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }

          .property-item {
            margin: 20px;
            flex: 1;
            min-width: 280px;
            max-width: 320px;
          }

          .property-link {
            text-decoration: none;
            color: inherit;
          }

          .image-text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(-50px);
            transition: opacity 1s ease, transform 1s ease;
          }

          .property-list.animate .image-text-wrapper {
            opacity: 1;
            transform: translateY(0);
          }

          .property-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }

          .property-image:hover {
            transform: scale(1.05);
          }

          .text-wrapper {
            text-align: center;
          }

          .property-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }

          .property-description {
            font-size: 1em;
            color: #666;
            max-width: 300px;
            margin: 0 auto;
          }

          .image-text-wrapper.hovered .property-image {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
}

export default Propertie;
