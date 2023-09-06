import React,{useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
    
const Register = () => {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [userName, setuserName] = useState('')
    const [pass, setPass] = useState('')

    function handleFname(e) {
        setFname(e.target.value)
    }
    function handleLname(e) {
        setLname(e.target.value)
    }
    function handleUserName(e) {
        setuserName(e.target.value)
    }
    function handlePass(e) {
        setPass(e.target.value)
    }

    const history = useHistory()
    const handleSubmit = async() =>{
        try {
            let OBJ =   {
                username : userName,
                password : pass,
                fname : fname,
                lname : lname
            }
            const res = await axios.post("http://localhost:3000/blog/register", OBJ)            
            localStorage.setItem('token', res.data.token)
            return history.push('/')

        } catch (err) {
            console.log(err);
        }    
    }
  return (
    <>
        <div class="container">
        <h2>Login Form</h2>
            <div class="form-group">
                <label for="username">First Name:</label>
                <input type="text" id="username" name="fname" onChange={handleFname} required />
            </div>
            <div class="form-group">
                <label for="password">Last Name:</label>
                <input type="text" id="password" name="lname" onChange={handleLname} required />
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" onChange={handleUserName} required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handlePass} required />
            </div>
            <div class="form-group">
                <button type="submit" onClick={handleSubmit}>Register</button>
            </div>
    </div> 
    </>
  )
}

export default Register
