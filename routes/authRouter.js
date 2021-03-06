 let Router = require('express').Router;
let passport = require ('passport')
let User = require('../db/schemas/userSchema.js').User
let checkAuth = require('../config/middleware.js').checkAuth
let secrets = require('../config/secrets.js')


const authRouter = Router()


authRouter
  .post('/register', function(req, res){
    // passport appends json-data to request.body
    // console.log(req.body)
    let newUser = new User(req.body)

    User.find({email: req.body.email}, function(err, results){
      if (err) return res.status(500).send('error saving querying db for user')

      if(results !== null && results.length > 0 ) { 
        return res.status(401).send(`oops, record for <${req.body.email}> already exists`)
      }

      newUser.save(function(err, record){
        if(err) return res.status(500).send('server/db error on attempt to save user to db')
        let userCopy = newUser.toObject()
        delete userCopy.password
        res.json(userCopy)
      })
    })
  })

authRouter
  .get('/current', function (req, res) {
    if (req.user) res.json({user: req.user});
    else res.json({user: null})
  })
  .post('/login', function(req,res,next){
    passport.authenticate('local', function(err,user,info) {
      if (err || !user) {
        res.status(400).json('incorrect email/password combination')
        return 
      }
      else {
        req.login(user,function(err) {
          if (err) {
            res.status(400).send(err)
            return
          }
          else {
            delete user.password
            res.json(user)
          }
        })
      }
      next()
    })(req,res,next)  
  })  
  .get('/logout', function (req, res) {
    if (req.user) {
      // console.log(req.user)
      let email = req.user.email
      req.logout()
      res.json({
        msg: `user <${email}> logged out`
      })
    }
    else {
      res.json({
        msg: 'error: no current user'
      })
    }
  })
  .post('/checkPin', function(req,res) {
    if (req.body.code === secrets.code) { 
      res.status(200).send('OK')
    }
    else {
      res.status(400).send('bad pin')
    }
  })


module.exports = authRouter