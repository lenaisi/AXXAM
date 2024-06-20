import React from 'react';
import { Link } from 'react-router-dom';

import './compteNotSetUp.css'; // Import du fichier CSS pour le style

const ErreurCompte = () => {
  return (
    <div className="account-not-found-container">
    <div className="account-not-found">
        <h1>Compte non trouvé</h1>
        <p>Votre compte n'est pas encore configuré. Pour continuer, veuillez vous inscrire.</p>
        <Link to="/sign-up" className="to-signup">Créer un compte</Link>
    </div>
</div>

  );
}

export default ErreurCompte;
