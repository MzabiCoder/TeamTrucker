import React,{useContext,Fragment} from 'react'
import PropTypes from 'prop-types'
import ContactItem from './ContactItem'
import ContactContext from '../../Context/contact/contactContext'

const Contacts = props => {
    const contactContext = useContext(ContactContext)
    const {contacts}=contactContext
    return (
        <Fragment>
            {contacts.map(contact => <ContactItem key={contact.id} contact={contact}/> )} 
        </Fragment>
    )
}

Contacts.propTypes = {

}

export default Contacts
