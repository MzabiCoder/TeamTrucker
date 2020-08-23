import React, { useState, useContext,useEffect } from 'react'
import ContactContext from '../../Context/contact/contactContext'
import AlertContext from '../../Context/alert/AlertContext'


const ContactForm = () => {
   
    const contactContext = useContext(ContactContext)
    const  {setAlert}=useContext(AlertContext)
    const { addContact,current,clearCurrent,updateContact}=contactContext
    const [contact, setContat] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })
    useEffect(() => {
        if (current!==null) {
             setContat(current)
        }
      },[current])
    const { name, email, phone, type } = contact
    const change = e => setContat({ ...contact, [e.target.name]: e.target.value })


    const submit = e => {
        e.preventDefault()
   
        if (name === '' || email === '' || phone === '') {
            setAlert('Please enter all fields !!!','danger')
        } else {
            if (current !== null) {
               updateContact(contact) 
               
            } else {
            addContact(contact)
           }
           clearAll()
        }

       
    
    }

   const clearAll = () => {
       clearCurrent()
       setContat({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    }) 
    }
    return (
        <form onSubmit={submit}>
            <h2 className="text-primary">{current!==null ? 'Edit Member' :'Add Member'}</h2>
            <input type="text" name="name" placeholder="Name" value={name} id="" onChange={change}/>  
            <input type="email" name="email" placeholder="Email" value={email} id="" onChange={change}/>  
            <input type="text" name="phone" minLength="9" value={phone} placeholder="phone" id="" onChange={change} />  
            <h6> <strong>Contact Type</strong> </h6>
            <input type="radio" name="type" value='personal' onChange={change} checked={type === 'personal'} /> {' '} Personal{' '}
            <input type="radio" name="type" value='professional' onChange={change} checked={type === 'professional'} />{' '}Professional
            <div>
            
                <button   type="submit"  className="btn btn-primary btn-block" >{current!==null ? 'Edit Member' :'Add Member'} </button>
            </div>   
            {current !== null && (
                   <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                    </div>
            )}
        </form>
    )
}
export default ContactForm