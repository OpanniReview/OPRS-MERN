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
  blogs_and_comments: {
    type: [{
      title: {
        type: String,
        required: true
      },
      pdf: {
        name: String,
        data: Buffer,
        required: true
      },
      description: {
        type: String
      },
      comments: {
        type: [String],
      }
    }]
  }
}, { timestamps: true });
  
module.exports = mongoose.model('Blogs', UserSchema)