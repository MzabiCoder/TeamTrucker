import { ADD_CONTACT, DELETE_CONTACT, CONTACT_ERROR,UPDATE_CONTACT, CLEAR_CURRENT, SET_CURRENT, FILTER_CONTACTS, CLEAR_FILTER,GET_CONTACTS,CLEAR_CONTACTS } from '../types'

export default (state, action) => {
    const {payload,type}=action
    switch (type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
                loading:false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [ payload,...state.contacts],
                loading:false

            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.filter(contact=>contact._id!==payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current:payload
            }
            case CLEAR_CURRENT:
                return {
                    ...state,
                    current:null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.map(contact=>contact._id===payload._id?payload:contact)
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex) 
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error:payload
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                current: null,
                filtered: null,
     
            }
        default:
            return state
    }
}