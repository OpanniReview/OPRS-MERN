const express = require("express");
const Credential = require("../models/credentialSchema");

const router = express.Router();

// Functions to access database - queries
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const credential = await Credential.create({ username, password });
    res.status(200).json(credential);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const record = await Credential.findOne({ username: username });
    if (record.password === password) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
});

module.exports = router;