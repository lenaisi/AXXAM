
const mongoose = require ('mongoose');

mongoose
      .connect ('mongodb+srv://'+ process.env.DB_USER_PASS + '@cluster.ho6b0l7.mongodb.net/PFE',
      
      )
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log("failed to connect to MongoDB", err));