const FormModel = require('../models/form.model');

module.exports.createForm = async (req, res) => {
    try {
   
        const { typeAnnonce, typeBien, wilaya, priceMin, priceMax } = req.body;
        console.log(req.body);

        const newForm = new FormModel({ typeAnnonce, typeBien,wilaya,priceMin, priceMax });
        await newForm.save();

        res.status(201).json({ message: 'Formulaire créé avec succès', data: newForm });
    } catch (error) {
    
        console.error('Erreur lors de la création du formulaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du formulaire' });
    }
}; 

module.exports.getAllForms = async (req, res) => {
    try {
        const forms = await FormModel.find(); 
        res.json(forms);
    } catch (error) {
        console.error('Erreur lors de la récupération des formulaires :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des formulaires' });
    }
};
