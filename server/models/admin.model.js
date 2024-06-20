const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');


const adminSchema = new mongoose.Schema(
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
      required: true,
      max: 1024,
      minlength: 6
    },
    phoneNumber: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
    otpCode: {
      type: String,
    },
    otpCodeExpiration: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'admin'
    }
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function(next) {
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

adminSchema.statics.login = async function(email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('Email incorrect');
};

const AdminModel = mongoose.model("admin", adminSchema);
module.exports = AdminModel;
