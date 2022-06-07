import { useState } from 'react'
import Blog from './Blog'
import CreateForm from './CreateForm'
import blogService from '../services/blogs'

const LoggedIn = ({
  user, setUser,
  blogs, setBlogs,
}) => {
  
  return (
  <div>
    <h2>blogs</h2>
    <p>
      {user.username} is logged in
      <button onClick={() => {
        window.localStorage.clear()
        setUser(null) // change state, trigger re-render 
        setBlogs([]) // reset state at logout
      }}>
        logout
      </button>
    </p>  
  </div>
  )
}

export default LoggedIn