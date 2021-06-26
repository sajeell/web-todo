import { useState } from 'react'
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField'

import './Login.css'

import mainBackground from '../../static/images/main_bg.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    e.preventDefault()

    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault()

    setPassword(e.target.value)
  }

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-left-heading">
          <span>welcome back!</span>
        </div>
        <div className="login-left-form-wrapper">
          <TextField id="outlined-basic" label="Email address" variant="outlined" type="email"
            style={{ width: 240, marginTop: 30 }} value={email} onChange={handleEmail} />
          <br />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" style={{ width: 240 }}
            value={password} onChange={handlePassword} />
          <Link
            to="app"
          >
            <input type="submit" value="log in" className="login-button" />
          </Link>
          <div className="login-left-forgot-password">
            <span>Forgot your password?</span>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src={mainBackground} alt="Main Logo" draggable={false} />
      </div>
    </div>
  )
}