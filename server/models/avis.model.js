

const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  note: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const Avis = mongoose.model('Avis', avisSchema);

module.exports = Avis;
