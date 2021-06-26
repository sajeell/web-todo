import { useState } from 'react'
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField'

import './Register.css'

import mainBackground from '../../static/images/main_bg.png'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleName = (e) => {
    e.preventDefault()

    setName(e.target.value)
  }

  const handleEmail = (e) => {
    e.preventDefault()

    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault()

    setPassword(e.target.value)
  }

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <div className="register-left-heading">
          <span>Let's GO!</span>
        </div>
        <div className="register-left-form-wrapper">
        <TextField id="outlined-basic" label="Name" variant="outlined"
                     style={{ width: 240, marginTop: 30 }} value={name} onChange={handleName} />
          <br /> 
          <TextField id="outlined-basic" label="Email address" variant="outlined" type="email"
                     style={{ width: 240}} value={email} onChange={handleEmail} />
          <br />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" style={{ width: 240 }}
                     value={password} onChange={handlePassword} />
          <input type="submit" value="register" className="register-button" />
          <div className="register-left-forgot-password">
          <Link to="login">
            <span>Already have an account? Sign In here</span>
          </Link>
          </div>
        </div>
      </div>
      <div className="register-right">
        <img src={mainBackground} alt="Main Logo" draggable={false} />
      </div>
    </div>
  )
}