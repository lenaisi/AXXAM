const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
  { 
   
    nomComplet: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      // max: 1024,
      // minlength: 6
    },

    phoneNumber: {
      type: String,
    },


    resetToken:{
      type: String,
    },
    resetTokenExpiration:{
      type: Date,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    
   
    otpCode: {
      type: String,
    },
    otpCodeExpiration:{
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House'
    }]
  }
);


userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect');
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

