const express = require("express");
const Credential = require("../models/credentialSchema");
const User = require("../models/UserSchema");
const bcrypt = require('bcrypt')
const validator = require('validator')
const multer = require('multer')

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Functions to access database - queries
router.post("/signup", async (req, res) => {
  const email = req.body.login_id;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }

    const exists = await Credential.findOne({ login_id:email })

    if (exists) {
      throw Error('Email already in use')
    }

    if (!(email.includes(".edu") || email.includes(".ac"))) {
      throw Error("Email is not from educational institution")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const credential = await Credential.create({ login_id:email, password:hash });
    res.json({status: !(!(credential))});
  } catch (error) {
    console.log(error.message)
    res.json({ status: false });
  }
});

router.post("/signin", async (req, res) => {

  try {
    const record = await Credential.findOne({ login_id: req.body.login_id});
    console.log(record);

    if (record) {
      res.json({status: await bcrypt.compare(req.body.password, record.password)})
    }
    else res.json({status: false})
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
});

router.post("/register", async (req, res) => {
  const login_id = req.body.login_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const degree = req.body.degree;
  const personal_link = req.body.personal_link;
  const profession = req.body.professionalStatus;

  try {
    if (!first_name || !last_name || !gender || !degree || !profession) {
      throw Error("All compulsory fields should be filled")
    }

    // if (!/[^a-zA-Z]/.test(first_name) || !/[^a-zA-Z]/.test(last_name)) {
    //   throw Error("Name cannot include numbers or special characters")
    // }

    if (email && !validator.isEmail(email)) {
      throw Error('Email not valid')
    }

    try {
      if (personal_link) {const isURL = new URL(personal_link);}
    } catch {
      throw Error("Invalid Presonal link provided")
    }

    try {
      const isDate = new Date(dob);
    } catch {
      throw Error("Invalid DOB");
    }

    const user = await User.create({ login_id: login_id, first_name: first_name, last_name: last_name, gender: gender, dob: dob, additional_email: email, degrees_completed: degree, personal_links: personal_link, professional_status: profession});
    res.json({status: !(!(user))});
  } catch (error) {
    console.log(error.message)
    res.json({ status: false });
  }

})

router.post('/upload', upload.single('file'), async(req, res) => {

  const file = req.file;
  const abstract = req.body.abstract;
  const authors = req.body.authors;
  const login_id = req.body.login_id;
  const title = req.body.title;

  try {
    if (!file) {
      throw Error("Upload a file");
    }

    if (!authors) {
      throw Error("Authors field cannot be empty");
    }

    if (!abstract) {
      throw Error("Provide a description of the paper");
    }

    const result = await User.findOne( { login_id: login_id } );

    for (let i=0; i<(result.blogs_and_comments.length); i++) {
      if (result.blogs_and_comments[i].title === title) {
        throw Error("Title already exists");
      }
    }

    result.blogs_and_comments.push(
      {
        title: title,
        post: {
          pdf: {
            name: file.originalname,
            data: file.buffer
            },
          authors: authors,
          abstract: abstract
        }
      })

    const update_result = await User.findOneAndReplace({ login_id: login_id }, result);

    res.json({status: !(!(update_result))});

  } catch (error) {
      console.log(error.message);
      res.json({status: false})
  }
}) 

module.exports = router;