const express = require('express')
const router = express.Router()
const User = require('../../Models/User')
const bcrypt=require('bcryptjs')
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const auth=require('../../middleware/M_auth')



//@route  POST apoi/users
//@desc Register a user
//@access Public
router.post('/', [
     check('name', 'name is required !!').not().isEmpty(),
     check('email', 'valid email is required !!').isEmail(),
     check('password', 'password with 6 or more characters is required !!').isLength({min:6}),
     
], async (req, res) => {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
               return res.status(400).json({errors:errors.array()})
          }
          const { name, email, password } = req.body
          try {
               let user = await User.findOne({ email })
               if (user) {
                    return res.status(400).json({message:'User already exists !!!'})
               }

               user = new User({
                    name,
                    email,
                    password
               })

               const salt = await bcrypt.genSalt(10)
               user.password = await bcrypt.hash(password, salt)
               await user.save()
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

//@route GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', auth, async (req, res) => {
     try {
          const user = await await User.findById(req.user.id).select('-password')
          res.status(200).json(user)
     } catch (error) {
          console.error(error.message)
          res.status(500).send('Server Error')
     }
})







module.exports=router