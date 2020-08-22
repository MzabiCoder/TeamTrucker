import React, { useReducer } from 'react'
 import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT } from '../types'
import setAuthToken from '../../utils/SetTokenJS'
 
const AuthState = props => {
    const Istate = {
        token: localStorage.getItem('token'),
        user:null,
        isAuthenticated: null,
        loading: true,
        error:null
    }

    const [state, dispatch] = useReducer(AuthReducer, Istate)
    
   // Load user
    const LoadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
      }
        try {
            const res = await axios.get('/api/users')
            dispatch({
                type: USER_LOADED,
                payload:res.data
           }) 
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload:error.response.data.message
            })
        }
    }
    
    // Register user

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            LoadUser()
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload:error.response.data.message
            })
        }
    }

    //Login user

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            LoadUser()
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload:error.response.data.message
            })
        }
    }

    //Logout 
    const logout = () => {
   
        dispatch({
            type:LOGOUT
        })
}


    //Clear errors

    const ClearErros = () => dispatch({type:CLEAR_ERRORS})
    

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                error: state.error,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                register,
                ClearErros,
                LoadUser,
                login,
                logout

            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState