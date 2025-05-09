const mongoose = require('mongoose')

const credentialSchema = new mongoose.Schema({
    login_id: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
module.exports = mongoose.model('Credential', credentialSchema)