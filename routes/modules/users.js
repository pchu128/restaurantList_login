const express = require('express')
const router = express.Router()
const User = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then( user => {
    if (user) {
      console.log('此信箱已經註冊過囉！')
      res.render('register', {
        name, email, password, confirmPassword
      })
    } else {
      return User.create({
        name, email, password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router