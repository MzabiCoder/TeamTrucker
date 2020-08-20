import React, { useState, useContext } from 'react'
import ContactContext from '../../Context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const [contact, setContat] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact
    const change = e => setContat({ ...contact, [e.target.name]: e.target.value })
    const submit = e => {
       
     e.preventDefault()
        contactContext.addContact(contact)
        setContat({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
        
    }
    return (
        <form onSubmit={submit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" name="name" placeholder="Name" value={name} id="" onChange={change}/>  
            <input type="text" name="email" placeholder="Email" value={email} id="" onChange={change}/>  
            <input type="text" name="phone" value={phone} placeholder="phone" id="" onChange={change} />  
            <h5>Contact Type</h5>
            <input type="radio" name="type" value='personal' onChange={change} checked={type === 'personal'} /> {' '} Personal{' '}
            <input type="radio" name="type" value='professional' onChange={change} checked={type === 'professional'} />{' '}Professional
            <div>
            
                <button   type="submit"  className="btn btn-primary btn-block" >Add Contact</button>
            </div>   
        </form>
    )
}
export default ContactForm