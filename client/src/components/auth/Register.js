import React,{useState,useContext,useEffect} from 'react'
 import AuthContext from '../../Context/auth/authContext'
import AlertContext from '../../Context/alert/AlertContext'

const Register = props => {

    const  {setAlert}=useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {isAuthenticated, error,register,ClearErros}=authContext
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2:''
    })
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if (error!==null) {
            setAlert(error, 'danger')
            ClearErros()
        }
        // eslint-disable-next-line
},[error,isAuthenticated,props])
    const { name, email, password, password2 } = user

    const onchange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onsubmit = e => {
        e.preventDefault()
        if (password === '' || password2 === '' || name === '' || email === '') {
             setAlert('please enter all fields!!!','danger') 
        }
        else if (password2 !== password) {
             setAlert('passwords dont match','danger')
        } else {
            register({
                name,
                email,
                password
                })
        }
      
  }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary"> Register </span></h1>
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onchange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" value={email} onChange={onchange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" minLength="6" value={password} onChange={onchange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Confirm Password</label>
                    <input type="password" name="password2" minLength="6"s value={password2} onChange={onchange}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

 

export default Register
