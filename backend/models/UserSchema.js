const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  
  login_id: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type:String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  additional_email: {
    type: String
  },
  degrees_completed: {
    type: String,
    required: true
  },
  personal_links: {
    type: String
  },
  professional_status: {
    type: String,
    required: true
  },
  blogs_and_comments: [{
      title: String,
      pdf: {
        name: String,
        data: Buffer
      },
      description: String,
      comments: [String],
    }]
}, { timestamps: true });
  
module.exports = mongoose.model('Blogs', UserSchema)