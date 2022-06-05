import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const handleGenericInputChange = hook => { // pfa
  return event => hook(event.target.value)
}

const LoginForm = ({
  setBlogs, setUser
}) => { 
  // username and password controlled states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // this will have the login
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
  
  // this will have a form
  return (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={handleGenericInputChange(setUsername)}
        />
      </div>
      <div>
        password
        <input 
          type="text"
          value={password}
          name="Password"
          onChange={handleGenericInputChange(setPassword)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )
}

export default LoginForm