const express = require("express");
const Credential = require("../models/credentialSchema");
const User = require("../models/UserSchema");
const Paper = require("../models/paperSchema");
const Notification = require("../models/notificationSchema");
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

  console.log(email)

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

    res.json({status: !(!(true))});
  } catch (error) {
    console.log(error.message)
    res.json({ status: false });
  }
});

router.post("/signin", async (req, res) => {

  try {
    const record = await Credential.findOne({ login_id: req.body.login_id});

    if (record) {
      res.json({status: await bcrypt.compare(req.body.password, record.password)})
    }
    else res.json({status: false})
  } catch (error) {
    console.log(error.message);
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
  const password = req.body.password;

  try {
    // Save the User credentials
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const credential = await Credential.create({ login_id, password:hash });


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

    const title = 'Welcome ' + first_name + ' ' + last_name
    //  Create a document for notifications
    const notif = await Notification.create({
      login_id: login_id,
      content: [{
        title: title,
        content: 'Thank you for registering with us. You can upload new papers by clicking on Conferences in the navbar. Upon submission for review, your paper will be assigned reviewers who will decide upon your paper.'
      }]
    })

    // const res = await User.findById({login_id})
    console.log("Registeration", res)
    res.json({status: !(!(user))});
  } catch (error) {
    console.log(error.message)
    res.json({ status: false });
  }

})

router.post('/upload', upload.single('file'), async(req, res) => {

  const file = req.file;
  const abstract = req.body.abstract;
  let authors = req.body.authors;
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

    if (!title) {
      throw Error("Provide a title")
    }

    authors = authors.split(',');
    
    const publish_paper = await Paper.create({
      title: title,
      pdfname: file.originalname,
      pdfdata: file.buffer,
      isPublished: false,
      authors: authors,
      abstract: abstract,
      comments: ['', '', '']
    })

    if (!publish_paper) {
      throw Error("Paper not published");
    }

    const paper_id = publish_paper._id;

    let user_details = "";
    let update_result = "";

    for (let i=0; i<authors.length; i++) {
      user_details = await User.findOne({login_id: authors[i]})

      if (!user_details) {
        throw Error("User not found")
      }

      user_details.published_papers.push(paper_id);
      
      update_result = await User.findOneAndReplace({login_id: authors[i]}, user_details);

      if (!update_result) {
        throw Error("Couldn't publish paper to the author")
      }
    }

    // Sending notification

    // notif_result = await Notification.findById({login_id})
    
    // if(!notif_result){throw Error("No notifications document for this loginId")}

    // const notif_content = notif_result.content
    // const notif_title = 'Paper titled ' + title +
    // notif_content.push({
    //   title: 'Paper submitted'
    // })

    res.json({ status: true })

  } catch (error) {
      console.log(error.message);
      res.json({status: false})
  }
}) 

router.get('/upload', async(req, res) => {
  result = await User.distinct('login_id')
  
  if(result){
    res.json({
      users: result
    })
  }

})

router.post('/profile', async (req, res) => {
  try {
    const user = await User.findOne({ login_id: req.body.loginId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/fetchallpapers', async(req, res) => {
  try{
    const login_id = req.body.login_id;

    let resultNew = await User.find({login_id});
    if (!resultNew) {
      throw Error("User not found");
    }
    
    result = resultNew[0].published_papers;
    result1 = resultNew[0].review_papers;

    let papers = [];
    let review = []

    let paper_result = "";
    let review_result = "";

    for (let i=0; i<result.length; i++) {
      paper_result = await Paper.findById(result[i]);
      papers.push(paper_result);
    }

    for (let i=0; i<result1.length; i++) {
      review_result = await Paper.findById(result1[i]);
      review.push(review_result);
    }

    res.json({
      blogs: papers, status: true, reviewPapers: review
    })
  } catch(error) {
    console.log(error.message);
    res.json({status: false});
  }

})

router.post('/fetchallpapersAdmin', async(req, res) => {
  try{

    let resultNew = await Paper.find({reviewers: []});
    if (!resultNew) {
      throw Error("Papers empty");
    }

    let resultnext = await Paper.find({reviewers: {$ne:[]}, isPublished:false});
    if (!resultnext) {
      throw Error("Papers empty");
    }

    let resultPub = await Paper.find({reviewers: {$ne:[]}, isPublished:true});
    if (!resultPub) {
      throw Error("Papers empty");
    }

    console.log("PAPERS PUBLISHED")
    console.log("PAPERS PUBLISHED")
    console.log("PAPERS PUBLISHED")
    console.log(resultPub['title'])
    console.log("PAPERS PUBLISHED")
    console.log("PAPERS PUBLISHED")
    console.log("PAPERS PUBLISHED")

    res.json({
      blogs: resultNew, status: true, reviewers_assigned: resultnext, published_blogs: resultPub
    })

  } catch(error) {
    console.log(error.message);
    res.json({status: false});
  }

})

router.post('/getpaperdetails', async(req, res) => {

  try {
    const paper_id = req.body.paper_id
    let result = await Paper.find({_id: paper_id});
    if (result) {
      res.json({
        paper_details: result,
        status: true
      })
    } else {
      throw Error("Paper not found")
    }
  } catch(error) {
    console.log(error.message);
    res.json({status: false})
  }

})

router.post('/adminUpload', async(req, res) => {
  try{
    const reviewers = req.body.reviewers;
    const paper_id = req.body.paper_id;

    if(paper_id && reviewers.length > 0){
      for(let i=0; i<reviewers.length; i++){
        user_details = await User.findOne({login_id: reviewers[i]})

        if (!user_details) {
          throw Error("User not found")
        }

        user_details.review_papers.push(paper_id);
        
        update_result = await User.findOneAndReplace({login_id: reviewers[i]}, user_details);

        if (!update_result) {
          throw Error("Couldn't assign paper to author")
        }
      }

      paper_details = await Paper.findOne({_id: paper_id})
      paper_details.reviewers = reviewers;
      
      update_result = await Paper.findOneAndReplace({_id: paper_id}, paper_details);
      if (!update_result) {
        throw Error("Couldn't assign paper to author")
      }
    }

    res.json({ status: true })

  } catch(error) {
    console.log(error.message);
    res.json({status: false});
  }

})

router.post('/adminPublish', async(req, res) => {
  try{
    const isPublished = req.body.isPublished;
    const paper_id = req.body.paper_id;

    if(paper_id ){
      paper_details = await Paper.findOne({_id: paper_id})
      paper_details.isPublished = isPublished;
      
      update_result = await Paper.findOneAndReplace({_id: paper_id}, paper_details);
      console.log(paper_details)
      if (!update_result) {
        throw Error("Couldn't publish paper")
      }
    }

    res.json({ status: true })

  } catch(error) {
    console.log(error.message);
    res.json({status: false});
  }

})

router.post('/addcomment', async(req, res) => {

  try{
    const paper_id = req.body.paper_id
    let result = await Paper.find({_id: paper_id});
    if (result) {
      result = result[0];
      result.comments = req.body.comment;
      let update_result = await Paper.findOneAndReplace({_id: paper_id}, result);
      if (update_result) {
        res.json({
          status: true
        })
      } else {
        res.json({
          status: false
        })
      }
    }
  } catch(error) {
    console.log(error.message);
    res.json({status:false});
  }
})

router.post('/fetchnotifications', async(req, res) => {
  try{
    const login_id = req.body.login_id;

    let resultNew = await Notification.find({login_id});
    if (!resultNew) {
      throw Error("User not found");
    }
    
    console.log("Notifications result", resultNew, login_id)
    result = resultNew[0].content;
    res.json({
      notifications: result,
      status: true
    })
  } catch(error) {
    console.log(error.message);
    res.json({status: false});
  }

})

module.exports = router;