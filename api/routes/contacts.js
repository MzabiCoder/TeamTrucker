const express = require('express')
const router = express.Router()


//@route  GET apoi/contacts
//@desc get contacts
//@access Private
router.get('/', (req, res) => {
    
     res.send('user')
})





module.exports=router