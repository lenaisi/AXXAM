import React from 'react';

const Avis = ({ contenu, note }) => {

  const genererEtoiles = (note) => {
    const etoiles = [];
    for (let i = 0; i < note; i++) {
      etoiles.push(<span key={i}>★</span>);
    }
    return etoiles;
  };

  return (
    <div className="avis">
      <p>{contenu}</p>
      <div className="etoiles">{genererEtoiles(note)}</div>
    </div>
  );
};

export default Avis;
