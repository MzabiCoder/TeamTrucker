import React,{useState,useEffect,useContext} from 'react'
 import AuthContext from '../../Context/auth/authContext'
import AlertContext from '../../Context/alert/AlertContext'

const Login = props => {
    const  {setAlert}=useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {isAuthenticated, error,login,ClearErros}=authContext
    const [user, setUser] = useState({
        email: '',
        password: '',

    })

    const { email, password  } = user

    const onchange = e => setUser({ ...user, [e.target.name]: e.target.value })

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
    const onsubmit = e => {
        e.preventDefault()
        if (password === ''  || email === '') {
            setAlert('please enter all fields!!!','danger') 
       }
         else {
           login({
               email,
               password
               })
       }
  }
    return (
        <div className="form-container">
            <h1>Sign In</h1>
            <form onSubmit={onsubmit}>
                
                <div className="form-group">
                    <label htmlFor="name"> <strong> Email</strong></label>
                    <input type="email" name="email" value={email} onChange={onchange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name"> <strong>Password</strong> </label>
                    <input type="password" name="password" value={password} onChange={onchange}/>
                </div>
               
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

 

export default Login
