const AdminModel = require("../models/admin.model");
const FormModel = require("../models/form.model");
const FormVisit = require("../models/formVisit.model");
const Avis = require("../models/avis.model");
const UserModel = require("../models/user.model");
const { signUpErrors, signInErrors } = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const House = require("../models/house.model");




const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { nomComplet, email, password, phoneNumber } = req.body;

  try {
    const admin = await AdminModel.create({
      nomComplet,
      email,
      password,
      phoneNumber,
    });
    res.status(201).json({ admin: admin._id });
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Cet utilisateur n'existe pas." }] });
    }
    
    const role = admin.role;

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Mot de passe incorrect." }] });
    }

    const token = createToken(admin._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ admin });
  } catch (err) {
    console.error("Erreur lors de la soumission du formulaire:", err);
    res.status(500).json({ err: [{ msg: "Erreur lors de la connexion. Veuillez réessayer plus tard." }] });
  }
};

// module.exports.signIn = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('req body',req.body);
//   try {
//     const admin = await AdminModel.login(email, password);
//     // Récupérer le rôle de l'administrateur
//     const role = admin.role;

//     // Créer un jeton d'authentification
//     const token = createToken(admin._id);

//     // Envoyer le jeton dans un cookie
//     res.cookie("jwt", token, { httpOnly: true, maxAge });

//     // Répondre avec l'ID de l'administrateur et son rôle
//     res.status(200).json({ admin: admin._id, role: role });
//   } catch (err) {
//     const errors = signInErrors(err);
//     res.status(200).json({ errors });
//   }
// };

module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
  console.log("logoutback");
};

module.exports.addHouse = async (req, res) => {
  const {
    title,
    description,
    typeAnnonce,
    typeBien,
    wilaya,
    price,
    locationMapLink,
    images, 
  } = req.body;

  const adminId = req.body.adminId;

  try {
    const house = await House.create({
      title,
      description,
      typeAnnonce,
      typeBien,
      wilaya,
      price,
      locationMapLink,
      images,
      admin: adminId,
    });
    res.status(201).json(house);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "Maison non trouvée" });
    }
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.deleteHouse = async (req, res) => {
  const houseId = req.params.id;

  try {
    if (!houseId) {
      return res.status(404).json({ message: "Maison non trouvée" });
    }

    const house = await House.findByIdAndDelete(houseId);

    res.status(200).json({ message: "Maison supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error deletion", err);
  }
};

module.exports.updateHouse = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, typeAnnonce, price} = req.body;

  try {
    if (!houseId) {
      return res.status(404).json({ message: "Maison non trouvée" });
    }

    const updatedHouse = await House.findByIdAndUpdate(
      houseId,
      {
        $set: {
          title,
          description,
          typeAnnonce,
          price,

        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedHouse) {
      return res.status(404).json({ message: "Maison non trouvée" });
    }

    res.status(200).json(updatedHouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error updating house", err);
  }
};



module.exports.getAllForms = async (req, res) => {
  try {
    const forms = await FormModel.find();
    res.json(forms);
  } catch (error) {
    console.error("Erreur lors de la récupération des formulaires :", error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des formulaires",
    });
  }
};


module.exports.getHousesByForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await FormModel.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Formulaire non trouvé" });
    }
    const houses = await House.find({
      typeAnnonce: form.typeAnnonce,
      typeBien: form.typeBien,
      wilaya: form.wilaya,
      priceMin: { $gte: form.priceMin },
      priceMax: { $lte: form.priceMax },
    });
    res.json(houses);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des maisons par formulaire :",
      error
    );
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des maisons",
    });
  }
};


module.exports.adminDashboard = (req, res) => {
  res
    .status(200)
    .json({ message: "Bienvenue sur le tableau de bord administrateur" });
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUsers = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getFormVisits = async (req, res) => {
  try {
    const formVisits = await FormVisit.find();
    res.status(200).json(formVisits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.find()
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


module.exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.find().populate('utilisateur', 'nomComplet');
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
