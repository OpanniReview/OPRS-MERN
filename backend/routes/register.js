const express = require("express");
const Credential = require("../models/credentialSchema");
const bcrypt = require('bcrypt')
const validator = require('validator')

const router = express.Router();

// Functions to access database - queries
router.post("/register", async (req, res) => {
  const email = req.body.login_id;
  const password = req.body.password;

  console.log(req.body);


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

module.exports = router;