// Connecting to database
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const credentialRoutes = require('./routes/routes.js')

const mongoURL = "mongodb+srv://TEST:test123@oprs.mqv8nlo.mongodb.net/OPRS";

// express app
const app = express();

// Schema for personal details

// Connection with front-end


// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('', credentialRoutes);


mongoose.connect(mongoURL).then(() => {
  console.log("SUCCESS");
	app.listen(4000)
});