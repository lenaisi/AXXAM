const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         res.cookie('jwt', '', { maxAge: 1 });
//         next();
//       } else {
//         let user = await UserModel.findById(decodedToken.id);
//         if (!user) {
//           user = await AdminModel.findById(decodedToken.id); 
//         }
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
          if (err) {
              res.locals.user = null;
              res.locals.role = null; // Ajouter la clé role avec la valeur null
              res.cookie('jwt', '', { maxAge: 1 });
              next();
          } else {
              let user = await UserModel.findById(decodedToken.id);
              let role = null; // Initialiser la variable role
              if (user) {
                  role = user.role; // Attribuer le rôle 'user' si l'utilisateur est trouvé dans UserModel
              } else {
                  user = await AdminModel.findById(decodedToken.id); 
                  if (user) {
                      role = user.role; // Récupérer le rôle si l'utilisateur est un admin
                  }
              }
              res.locals.user = user;
              res.locals.role = role;
              next();
          }
      });
  } else {
      res.locals.user = null;
      res.locals.role = null; // Ajouter la clé role avec la valeur null
      next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json('Unauthorized');
      } else {
        let user = await UserModel.findById(decodedToken.id);
        if (!user) {
          user = await AdminModel.findById(decodedToken.id); 
        }
        req.user = user;
        console.log("id:", decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
    return res.status(401).json('Unauthorized');
  }
};

module.exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json('Forbidden');
    }
    next();
  };
};
