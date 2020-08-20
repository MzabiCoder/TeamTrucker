import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactFormfrom from '../contacts/ContactForm'
 
const Home = () => {
    return (
        <div className="grid-2">
            <div>
           <ContactFormfrom/>
            </div>
            <div>
            <Contacts />
            </div>
          
        </div>
    )
}


export default Home
