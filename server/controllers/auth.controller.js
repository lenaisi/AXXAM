const UserModel = require('../models/user.model');
const { signUpErrors, signInErrors } = require('../utils/error.utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const House = require("../models/house.model");
const FormModel = require('../models/form.model');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');


const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
   return jwt.sign({id}, process.env.TOKEN_SECRET,{
      expiresIn: maxAge
   })
}

module.exports.signUp = async (req, res) => {
  const { nomComplet, email, password, phoneNumber } = req.body;
  console.log(req.body);
  
  try {

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Cette adresse email est déjà utilisée." });
    }

   
    const user = await UserModel.create({ nomComplet, email, password, phoneNumber });

    res.status(201).json({ user: user._id });
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur. Veuillez réessayer plus tard." });
  }
};


module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Cet utilisateur n'existe pas." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Mot de passe incorrect." }] });
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user });
  } catch (err) {
    console.error("Erreur lors de la soumission du formulaire:", error);
    res.status(500).json({ errors: [{ msg: "Erreur lors de la connexion. Veuillez réessayer plus tard." }] });
  }
};

module.exports.googleAuth = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const token = createToken(user._id);

      // console.log(" user :", user);
      res.cookie('jwt', token, { httpOnly: true, maxAge });
      res.status(200).json({ user: user._doc });
    } else {
      const newUser = new UserModel({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      // console.log(" savedUser :", savedUser);
      const token = createToken(savedUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge });
      res.status(200).json({ user: savedUser._doc });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
  console.log("logoutback");
};


module.exports.resetPassword = async (req, res) => {
  console.log("sur resetpassword");
 try {
   const { email } = req.body;
   const user = await UserModel.findOne({ email });

   if (!user) {
     return res.send({ status: "User not existed" });
   }

   const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'nepasrepondre458@gmail.com',
       pass: 'juge ttrw niet uddh'
     }
   });

   const mailOptions = {
     from: 'nepasrepondre458@gmail.com',
     to: user.email,
     subject: 'Reset Password Link',
     text: `${process.env.CLIENT_URL}/NewPassword/${user._id}/${token}`

   };

   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       console.log(error);
       return res.send({ status: "Error sending email" });
     } else {
       return res.send({ status: "Success" });
     }
   });
 } catch (error) {
   console.error('Error in reset password endpoint: ', error);
   return res.status(500).send({ status: "Internal Server Error" });
 }
};
module.exports.NewPassword = async (req, res) => {
  const {id, token} = req.params
  const {password} = req.body
  console.log("sur newpassword");
  jwt.verify(token, process.env.TOKEN_SECRET  , (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              UserModel.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
};

module.exports.getHouses = async (req, res) => {
   try {
     const houses = await House.find();
     res.status(200).json(houses);
   } catch (err) {
     res.status(400).json({ error: err.message });
   }
 };
 

 module.exports.findHouses = async (req, res) => {
  try {
    const { typeAnnonce, typeBien, wilaya, priceMin, priceMax } = req.body;
    
    const filters = {};

    if (typeAnnonce) {
      filters.typeAnnonce = typeAnnonce;
    }
    if (typeBien) {
      filters.typeBien = typeBien;
    }
    if (wilaya) {
      filters.wilaya = wilaya;
    }
    if (priceMin && priceMax) {
      filters.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
      filters.price = { $gte: priceMin };
    } else if (priceMax) {
      filters.price = { $lte: priceMax };
    }


    const houses = await House.find(filters);

    if (houses.length === 0) {
    
      return res.status(404).json({ message: 'Pas de maisons selon les critères spécifiés' });
    }

    res.json(houses);
  } catch (error) {
    console.error('Erreur lors de la recherche des maisons :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la recherche des maisons' });
  }
};



module.exports.addToFavorites = async (req, res) => {
  const userId = req.params.id;
  const {  houseId } = req.body;
  console.log('req.body',req.body);
  console.log('req params',req.params);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "Maison non trouvée." });
    }

    if (user.favorites.includes(houseId)) {
      return res.status(400).json({ message: "La maison est déjà dans les favoris de l'utilisateur." });
    }

    user.favorites.push(houseId);
    await user.save();

    res.status(200).json({ message: "Maison ajoutée aux favoris de l'utilisateur avec succès." });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la maison aux favoris :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la maison aux favoris.' });
  }
};

module.exports.removeFromFavorites = async (req, res) => {
  const { userId, houseId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "Maison non trouvée." });
    }

    if (!user.favorites.includes(houseId)) {
      return res.status(400).json({ message: "La maison n'est pas dans les favoris de l'utilisateur." });
    }

    user.favorites = user.favorites.filter(favorite => favorite.toString() !== houseId);
    await user.save();

    res.status(200).json({ message: "Maison supprimée des favoris de l'utilisateur avec succès." });
  } catch (error) {
    console.error('Erreur lors de la suppression de la maison des favoris :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la maison des favoris.' });
  }
};

module.exports.updateFavorites = async (req, res) => {
  const userId = req.params.id;
  const { houseId, action } = req.body;
  console.log('req.body', req.body);
  console.log('req.params', req.params);

  try {
    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "Maison non trouvée." });
    }

    let update;
    if (action === 'add') {
      update = { $addToSet: { favorites: houseId } };
    } else if (action === 'remove') {
      update = { $pull: { favorites: new mongoose.Types.ObjectId(houseId) } };
    } else {
      return res.status(400).json({ message: "Action invalide. Utilisez 'add' ou 'remove'." });
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      update,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const message = action === 'add' 
      ? "Maison ajoutée aux favoris de l'utilisateur avec succès." 
      : "Maison supprimée des favoris de l'utilisateur avec succès.";

    res.status(200).json({ message, favorites: user.favorites });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des favoris :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour des favoris.' });
  }
};



module.exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des favoris', error });
  }
};




module.exports.userDashboard = (req, res) => {
   res.status(200).json({ message: 'Bienvenue sur le tableau de bord utilisateur' });
 };
 