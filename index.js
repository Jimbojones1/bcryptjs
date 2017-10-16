const express = require('express');
const app     = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session  = require('express-session');

app.use(session({
  secret: 'this is some randome secret string you make up that is used to unlock the hash, dont share this with anyone',
  resave: false,
  saveUnitialized: false
}))



require('./db/db')

// require our controllers
const userController = require('./controllers/user')
const candyController = require('./controllers/candy')

// tell express where are view is
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// used so we can parse the body of a request
// so that we can read req.body
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
// this line makes the public folder work, we
// store our client side (jquery) js, css, images, audio
app.use(express.static('public'));

// use our controllers after body parser and static
// every route in the fruitController starts
// with /fruits now
// so the first route in the controller is
// now /fruits/fruits
app.use('/users', userController)
app.use('/candy', candyController)





app.listen(3000, () => {
  console.log('app is listening on port 3000')
})
