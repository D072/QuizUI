import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"


const Nav = () => {
    const history = useHistory()

    const handleDelete = () =>{
        localStorage.removeItem("token")
        return history.push('/')
    }
  return (
    <>
        <Link exact to='/home'>Home</Link>
        <Link exact to='/category'>Category</Link>
        <Link exact to='/question'>Quiz</Link>
        <button onClick={handleDelete}>Log Out</button>
    </>
  )
}

export default Nav
