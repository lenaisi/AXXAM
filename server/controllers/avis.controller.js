const Avis = require('../models/avis.model');
const UserModel = require("../models/user.model");


module.exports.createAvis = async (req, res) => {
  try {

    const { utilisateur, contenu, note } = req.body;
    console.log(req.body);

    const nouvelAvis = await Avis.create({
      utilisateur: utilisateur,
      contenu: contenu,
      note: note 
    });


    res.status(201).json({
      status: 'success',
      data: {
        avis: nouvelAvis
      }
    });
  } catch (error) {
   
    res.status(400).json({ status: 'error',message: error.message });
  }
};



module.exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.aggregate([
      {
        $lookup: {
          from: "users", // Nom de la collection des utilisateurs
          localField: "utilisateur", // Champ à partir de la collection des avis
          foreignField: "_id", // Champ à partir de la collection des utilisateurs
          as: "utilisateur" // Nom du champ dans le document résultant
        }
      },
      {
        $unwind: "$utilisateur"
      },
      {
        $project: {
          _id: 1,
          contenu: 1,
          note: 1,
          "utilisateur.nomComplet": 1 // Inclure le nom complet de l'utilisateur dans le document résultant
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        avis
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};


module.exports.getAvisById = async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        avis
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};


module.exports.updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        avis
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};


module.exports.deleteAvis = async (req, res) => {
  try {
    await Avis.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};