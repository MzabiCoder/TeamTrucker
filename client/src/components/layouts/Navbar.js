import React,{useContext,Fragment} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext'
import ContactContext from '../../Context/contact/contactContext'

export const Navbar = ({title,icon}) => {

    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)
    const {clearContacts}=contactContext
    const {isAuthenticated,logout,user}=authContext
    const onLogout = () => {
        logout()
        clearContacts()
  }
    const authLinks = (
        <Fragment>
            <li style={{marginRight:'1.5rem'}}>Welcome {' '} <span style={{ fontWeight: 'bold',fontWeight:'2rem'}}> {user && user.name.toUpperCase()}</span> </li>
            <li>
                <a href="" onClick={onLogout} >
                <i className="fas fa-sign-out-alt"></i> <span className="hise-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li>
        <Link to="/register">Register</Link>
        </li>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <h1>
                {title}
            </h1>
            <ul>
               {isAuthenticated ? authLinks:guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps = {
    title: 'Team Trucker',
    icon:'fas fa-id-card-alt'
}
