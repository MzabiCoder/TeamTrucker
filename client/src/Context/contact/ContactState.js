import React, { useReducer } from 'react'
 import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, CONTACT_ERROR,CLEAR_CURRENT, SET_CURRENT, FILTER_CONTACTS, CLEAR_FILTER,CLEAR_CONTACTS,GET_CONTACTS } from '../types'
import axios from 'axios'

const ContactState = props => {
    const Istate = {
        contacts: null,
        current:null,
        filtered:null,
        error: null,
        loading:true
    }

    const [state, dispatch] = useReducer(ContactReducer, Istate)
    
    // Add Contact

    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({type:ADD_CONTACT,payload:res.data})
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload:error.response.message
            })
        }

    }
    // update contact
    const updateContact = async contact => {
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type:UPDATE_CONTACT,payload:res.data})
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload:error.response.message
            })
        }
     }

    // getcontacta

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')
            dispatch({
                type: GET_CONTACTS,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload:error.response.message
            })
        }
    }

    // Del contact
    const delContact = async id => {
     try {
         await axios.delete(`/api/contacts/${id}`) 
         dispatch({type:DELETE_CONTACT,payload:id})
     } catch (error) {
        dispatch({
            type: CONTACT_ERROR,
            payload:error.response.message
        })
     }
       
    }


    // Set Current
    const setCurrent = contact => {

        dispatch({type:SET_CURRENT,payload:contact})
    }

    // Clear Current
    const clearCurrent = () => {
        
        dispatch({type:CLEAR_CURRENT})
    }

    

    //filter contacts
    const filter_ac = input => {
        dispatch({type:FILTER_CONTACTS,payload: input})
    }

    //clear filter

    const Clearfilter =() => {
        dispatch({type:CLEAR_FILTER})
    }

    const clearContacts = () => dispatch({type:CLEAR_CONTACTS})

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current:state.current,
                error: state.error,
                filtered:state.filtered,
                addContact,
                delContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filter_ac,
                Clearfilter,
                getContacts,
                clearContacts,
              
               

            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState