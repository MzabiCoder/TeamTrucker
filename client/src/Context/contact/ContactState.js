import React, { useReducer } from 'react'
import uuid from 'react-uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, CLEAR_CURRENT, SET_CURRENT, FILTER_CONTACTS, CLEAR_FILTER } from '../types'

const ContactState = props => {
    const Istate = {
        contacts: [{
            id: 1,
            name: 'nabil',
            email: 'nabil@nabil.com',
            phone: "11111",
            type:'professional'
        },
        {
            id: 2,
            name: 'adil',
            email: 'adil@nabil.com',
            phone: "11111",
            type:'professional'
            },
            {
                id: 3,
                name: 'assiya',
                email: 'assiya@nabil.com',
                phone: "11111",
                type:'personal'
            }]
    }

    const [state, dispatch] = useReducer(ContactReducer, Istate)
    
    // Add Contact

    const addContact = contact => {
        contact.id = uuid()
        dispatch({type:ADD_CONTACT,payload:contact})
    }

    // Del contact

    // Set Current

    // Clear Current

    // update contact

    //filter contacts

    //clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState