const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('register', {})
})

router.post('/register', (req, res) => {
  console.log(req.body)

  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // create object to put into database
  const userDBentry = {};
  userDBentry.username = req.body.username;
  userDBentry.password = passwordHash;

  User.create(userDBentry, (err, user) => {
    if(err){
      res.send('error creating user')
    } else {

      res.send(user)
    }
  })
})


// Create a login view
// create a login route

// Use the bcrypt.compareSync('plain text password', 'hash')


















module.exports = router;
