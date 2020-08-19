const express = require('express')
const router = express.Router()
const User = require('../../Models/User')
const bcrypt=require('bcryptjs')
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config=require('config')



//@route  POST api/auth
//@desc Auth user a user & get the token
//@access Public
router.post('/', [
      check('email', 'valid email is required !!').isEmail(),
     check('password', 'password with 6 or more characters is required !!').isLength({min:6}),
     
], async (req, res) => {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
               return res.status(400).json({errors:errors.array()})
          }
          const {  email, password } = req.body
          try {
               let user = await User.findOne({ email })
               if (!user) {
                    return res.status(400).json({message:'Invalid credential!!'})
               }

              const isMatch = await bcrypt.compare(password, user.password)
              if (!isMatch) {
                  return res.status(400).json({message:'Invalid credential!!'})
              }
              const payload = {
                user: {
                     id:user.id
                }
           }
           jwt.sign(payload, config.get('JWTsecret'), {
                expiresIn:360000
           }, (err, token) => {
                     if (err) throw err
                     res.json({ token })
           })
          } catch (error) {
               console.error(error.message)
               res.status(500).send('Server Error')
          }
})







module.exports=router