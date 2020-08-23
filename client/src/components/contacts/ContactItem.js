import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import ContatContext from '../../Context/contact/contactContext'

const ContactItem = ({ contact: { _id, name, phone, email, type } }) => {
   
     
    const contactContext = useContext(ContatContext)
    const { delContact, setCurrent,clearCurrent } = contactContext
    
    const del=()=>{
        delContact(_id)
        clearCurrent()
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '} <span style={{float:'right'}} className={`badge ${(type === 'professional' ? 'badge-success' : 'badge-primary')}`  }>{type.slice(0,1).toUpperCase()+type.slice(1)}</span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                    <i class="fas fa-at" style={{color:'rgb(24, 24, 105)'}}></i>{' '}{email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone" style={{color:"rgb(24, 24, 105)"}} ></i>{' '}{phone}
                    </li>
                )}
            </ul>
            <p>
            <button className="btn btn-dark btn-sm" onClick={()=>setCurrent({ _id,name, phone, email, type })}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={del} >Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
  contact:PropTypes.object.isRequired
}

export default ContactItem
