import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // see if user exists
  let localUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  if (localUser && !user) {
    blogService.getUserSpecificBlogs(localUser).then(blogs => {
      setUser(localUser)
      setBlogs(blogs)
    })
  }

  const handleLogin = async (event) => { // this will be an async cb
    event.preventDefault()
    let credentials = { username, password }
    try {
      let user = await loginService.login(credentials)
      // console.log('logging in', user)
      // now that we have the user (successfully, this is where we get all the relevant blogs)
      blogService.setToken(user) // set this as token on service
      let specificBlogs = await blogService.getUserSpecificBlogs(user)
      
      // locally store
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setBlogs(specificBlogs)
      setUser(user)
      setUsername('') //clears information from form
      setPassword('')
    } catch (e) {
      console.error('login unsuccessful', e)
    }
  }

  const toggleLogin = () => {
    // can no longer do inline due to required params
    if (user === null) {
      return (
        <LoginForm 
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        />
      )
    } else {
      return (
        <LoggedIn 
          user = {user}
          setUser = {setUser}
          blogs = {blogs}
        />
      )
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {toggleLogin()}
    </div>
  )
}

export default App
