import { REGISTER_SUCCESS,REGISTER_FAIL, LOGOUT,CLEAR_ERRORS,USER_LOADED, AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL } from '../types'

export default (state, action) => {
    const {payload,type}=action
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false,
                
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: payload,
                user:null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}