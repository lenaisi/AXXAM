const mongoose = require('mongoose');

const FormVisitSchema = new mongoose.Schema({
    nomComplet: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required : false
       
    }
});

const FormVisit = mongoose.model('FormVisit', FormVisitSchema);

module.exports = FormVisit;