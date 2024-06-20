
const UserModel = require('../models/user.model');
const FormVisit = require('../models/formVisit.model');


module.exports.createForm = async (req, res) => {
    try {
       
   
        const { nomComplet, email, phoneNumber, message } = req.body;
        console.log(req.body);

        const newForm = new FormVisit({ nomComplet, email, phoneNumber, message });

        await newForm.save();

        res.status(201).json({ message: 'Formulaire créé avec succès', data: newForm });
    } catch (error) {
    
        console.error('Erreur lors de la création du formulaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du formulaire' });
    }
};
