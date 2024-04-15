const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  
  login_id: {
    type: String,
    unique: true,
    required: true
  },
  content: [{
    title: String,
    content: String
  }]
}, { timestamps: true });
  
module.exports = mongoose.model('notifications', notificationSchema)