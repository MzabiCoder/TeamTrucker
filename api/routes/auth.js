const express = require('express')
const router = express.Router()


//@route  GET api/auth
//@desc Get logged in a user
//@access Private
router.get('/', (req, res) => {
    
     res.send('auth users')
})

//@route  POST api/auth
//@desc AUth user & get token
//@access Public
router.post('/', (req, res) => {
    
    res.send('auth users')
})





module.exports=router