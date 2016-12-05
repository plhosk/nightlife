require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const passport = require('passport')
const path = require('path')
const favicon = require('serve-favicon')

const app = express()

app.use(favicon(path.join(__dirname, '/../public/favicon.ico')))

require('./passport')()

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)


app.set('port', process.env.PORT || 3000)
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))


// handle api paths here
app.use('/api/signup', require('./api/signup'))
app.use('/api/login', require('./api/login'))
app.use('/api/logout', require('./api/logout'))
app.use('/api/search', require('./api/search'))
app.use('/api/attending', require('./api/attending'))

// default route for single-page app
app.use('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port')) // eslint-disable-line
})
