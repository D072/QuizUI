import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom'


const Login = () => {
    const [userName, setuserName] = useState('')
    const [pass, setPass] = useState('')

    function handleUsername(e) {
        setuserName(e.target.value)
      }
    function handlePass(e) {
        setPass(e.target.value)
    }
    
    const history = useHistory()
    const handleSubmit = async () =>{
        try {
            let OBJ =   {
                username : userName,
                password : pass
            }
            const res = await axios.post("http://localhost:3000/login", OBJ)
            localStorage.setItem('token', res.data.token)
            return history.push('/home')
                
            } catch (err) {
                alert("User not found")
                console.log(err);
        }    
    }
  return (
    <>
        <div class="container">
        <h2>Login Form</h2>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required onChange={handleUsername}></input>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={handlePass}></input>
            </div>
            <div class="form-group">
                <button type="submit" onClick={handleSubmit}>Login</button>
                <p class="text">Not Have an Account ? <span>
                  <Link exact to='/register'>
                    Register
                  </Link>
                </span></p>
            </div>
        </div> 
    </>
  )
}

export default Login;
