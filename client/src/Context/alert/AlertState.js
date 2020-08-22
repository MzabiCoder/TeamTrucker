import React, { useReducer } from 'react'
 import AlertContext from './AlertContext'
import AlertReducer from './Alertreducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'
import uuid from 'react-uuid'
 
const AlertState = props => {
    const Istate =[]

    const [state, dispatch] = useReducer(AlertReducer, Istate)
    
   // Set alert
    
    const setAlert = (msg,type,timeout=1000) => {
        const id = uuid()
        dispatch({ type: SET_ALERT, payload: { msg, type, id } })
        
        setTimeout(() =>{
            dispatch({type:REMOVE_ALERT,payload:id})
        },timeout)
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert

            }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState