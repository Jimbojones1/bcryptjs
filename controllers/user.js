const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('register', {message: ''})
})

router.post('/register', (req, res) => {
  console.log(req.body)

  User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.send(err)
    } else {

      if(!user){
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

              req.session.logged = true;
              req.session.username = user.username;
              res.redirect('/users/profile')
            }
          })
      } else {
        res.render('register', {message: 'username taken'})
      }
    }
  })
})

router.get('/profile', (req, res) => {
  console.log('---------------------------------------')
  console.log(req.session)
  console.log('---------------------------------------')
  res.render('profile', {username: req.session.username})
})


// Create a login view
router.get('/login', (req, res) => {
  res.render('login', {message: ''})
})
// create a login route
router.post('/login', (req, res) => {
  console.log(req.body)

  User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.send(err)
    } else {
      console.log(user)
            if(user){

                    if(bcrypt.compareSync(req.body.password, user.password)){
                      req.session.logged = true;
                      req.session.username = user.username;
                      res.redirect('/users/profile')
                    } else {
                      res.render('login', {message: 'login incorrect'})
                    }

            } else {
               res.render('login', {message: 'login incorrect'})
            }
    }
  })



})
// Use the bcrypt.compareSync('plain text password', 'hash')


module.exports = router;
