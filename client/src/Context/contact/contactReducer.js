import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, CLEAR_CURRENT, SET_CURRENT, FILTER_CONTACTS, CLEAR_FILTER } from '../types'

export default (state, action) => {
    const {payload,type}=action
    switch (type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts,payload]

            }
        default:
            return state
    }
}