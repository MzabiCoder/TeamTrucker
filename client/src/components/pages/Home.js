import React,{useContext,useEffect} from 'react'
import Contacts from '../contacts/Contacts'
import ContactFormfrom from '../contacts/ContactForm'
import Filter from '../contacts/Filter'
import AuthContext from '../../Context/auth/authContext'
 
const Home = () => {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        authContext.LoadUser()

        //eslint-disbale-next-line
    })
    return (
        <div className="grid-2">
            <div>
            <ContactFormfrom/>
            </div>
            <div>
             <Filter/>   
            <Contacts />
            </div>
          
        </div>
    )
}


export default Home
