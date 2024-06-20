module.exports.signUpErrors = (err) => {
    let errors = { phoneNumber: "", email: "", password: "" };
  
    if (err.message.includes("phoneNumber"))
      errors.phoneNumber = "Numéro de tel incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Incorrect Email.";

    // if (err.message.includes("trustedEmail")) errors.trustedEmail = "Incorrect trusted email.";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minimum";

    //   if (err.message.includes("Please provide an answer to your secret question."))
    //   errors.secretAnswer = "Veuillez fournir une réponse à votre question secrète.";

    // if (err.message.includes("secretQuestion"))
    //   errors.answer = "secret question indefined";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("phoneNumber"))
      errors.phoneNumber = "Ce numéro est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };
  
    if (err.message.includes("email")) {
      errors.email = "Email inconnu";
      console.log("Email error detected");
    }
  
    if (err.message.includes('password')) {
      errors.password = "Mot de passe incorrect";
      console.log("Password error detected");
    }
  
    return errors;
  };
  
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }