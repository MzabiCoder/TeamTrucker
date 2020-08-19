const express = require('express')
const router = express.Router()


//@route  POST apoi/users
//@desc Register a user
//@access Public
router.post('/', (req, res) => {
    
     res.send('user')
})





module.exports=router