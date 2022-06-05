import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // see if user exists
  let localUser = JSON.parse(
    window.localStorage.getItem('loggedBlogAppUser')
  )

  if (localUser && !user) {
    blogService.getUserSpecificBlogs(localUser).then(blogs => {
      blogService.setToken(localUser)
      setUser(localUser)
      setBlogs(blogs)
    })
  }

  const toggleLogin = () => {
    // can no longer do inline due to required params
    if (user === null) {
      return (
        <LoginForm 
          // handleLogin = {handleLogin}
          setBlogs = {setBlogs}
          setUser = {setUser}
        />
      )
    } else {
      return (
        <LoggedIn 
          user = {user}
          setUser = {setUser}
          blogs = {blogs}
          setBlogs = {setBlogs}      
        />
      )
    }
  }

  return (
    <div>
      {toggleLogin()} 
    </div>
  )
}

export default App
