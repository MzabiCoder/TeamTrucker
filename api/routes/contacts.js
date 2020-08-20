const express = require('express')
const router = express.Router()
const auth = require('../../middleware/M_auth')
const User = require('../../Models/User')
const Contact = require('../../Models/Contact')
 const { check,validationResult } = require('express-validator');



//@route  GET api/contacts
//@desc get contacts
//@access Private
router.get('/', auth,async (req, res) => {
    
     try {
          const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
          res.json(contacts)
     } catch (error) {
          console.error(error.message)
          res.status(500).send('Server Error')  
     }
})

//@route  POST api/contacts
//@desc get contacts
//@access Private
router.post('/', [auth, [
     [
        check('name', 'name is required !!').not().isEmpty(),
      
   ]
]],async (req, res) => {
     const errors = validationResult(req)
          if (!errors.isEmpty()) {
               return res.status(400).json({errors:errors.array()})
          }
          const {name,email,phone,type}=req.body
     try {
          let NewContact =new Contact({
               name,
               email,
               phone,
               type,
               user:req.user.id
          })
          await NewContact.save()
          res.json(NewContact)
     } catch (error) {
          console.error(error.message)
          res.status(500).send('Server Error')  
     }
})

//@route  PUT api/contacts
//@desc update a  contact
//@access Private
router.put('/:id', auth, async (req, res) => {

     const { name, email, phone, type } = req.body
     
     const Contactfield = {}
    if(name) Contactfield.name=name
     if(type) Contactfield.type=type
     if(phone) Contactfield.phone=phone
    if(email) Contactfield.email=email

     try {
          let contact = await Contact.findById(req.params.id) 
          if (!contact) {
               return res.status(404).json({message:'Contact not found'})
          }
          if (req.user.id !== contact.user.toString()) {
               return res.status(401).json({message:'Not Authorized!!'})

          }
          contact = await Contact.findByIdAndUpdate(req.params.id, { $set: Contactfield }, { new: true })
          await contact.save()
          res.json(contact)
     } catch (error) {
          console.error(error.message)
          res.status(500).send('Server Error')
     }
})


//@route  PUT api/contacts
//@desc delete a  contact
//@access Private
router.delete('/:id', auth, async (req, res) => {
     const contact=await Contact.findById(req.params.id)
     try {
          if (!contact) {
               res.status(404).json({message:'Contact not exists !!!'})
          }
          if (req.user.id !== contact.user.toString()) {
               return res.status(401).json({message:'Not Authorized!!'})

          }
          await contact.remove()
          res.json({message:'Contact removed !!!'})
     } catch (error) {
          console.error(error.message)
          res.status(500).send('Server Error') 
     }
})

module.exports=router