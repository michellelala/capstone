var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')

// gets all users in the db
router.get('/', db.getAllUsers)

// POST functions
router.post('/survey', db.userSurvey) // sets user attributes after user survey is submitted

// User authentication functions 
router.post('/register', db.registerUser, passport.authenticate('local'), (req, res) => res.json(req.user.username))
router.post('/login', passport.authenticate('local'), (req, res) => res.json({ id: req.user.id, username: req.user.username }))
// router.post('/new', db.registerUser)
router.get('/logout', loginRequired, db.logoutUser)

module.exports = router;
