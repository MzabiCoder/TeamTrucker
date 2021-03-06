import React,{useContext,Fragment,useEffect} from 'react'
 import ContactItem from './ContactItem'
import ContactContext from '../../Context/contact/contactContext'
import { Spinner } from '../layouts/Spinner'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const Contacts = props => {
    const contactContext = useContext(ContactContext)
    const { contacts, filtered,getContacts,loading } = contactContext
    useEffect(() => {
        getContacts()
        // eslint-disable-next-line
    },[]) 

    if (contacts!==null && contacts.length === 0 && !loading) {
        return <h3 style={{textAlign:'left'}}>Please add a contact...</h3>
    }
     
    
    return (
        <Fragment>
            {contacts!==null && !loading ? (  <TransitionGroup>  
                {filtered !== null ? filtered.map(contact => (
                    <CSSTransition key={contact._id} timeout={400} classNames="item" >
                    <ContactItem  contact={contact} />
                    </CSSTransition>
                )) : (contacts.map(contact =>

                    <CSSTransition key={contact._id} timeout={400} classNames="item" >
                    <ContactItem  contact={contact} />
                    </CSSTransition>
                
                    ))}
            
            </TransitionGroup>):(<Spinner/>)}
           
        </Fragment>
    )
}

 

export default Contacts
