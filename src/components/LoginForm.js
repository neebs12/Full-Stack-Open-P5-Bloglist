import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import FlashMessage from './FlashMessage'

const handleGenericInputChange = hook => { // pfa
  return event => hook(event.target.value)
}

const LoginForm = ({
  setBlogs, setUser,
}) => {
  // username and password controlled states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flashMsg, setFlashMsg] = useState('')
  const [isError, setIsError] = useState(null)

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

      // flash message
      setIsError(false)
      setFlashMsg('Successfully logged in: ', user.username)

    } catch (e) {
      setIsError(true)
      setFlashMsg('Incorrect username or password')
    }
  }

  // this will have a form
  return (
    <div>
      <h2>log in application</h2>
      <FlashMessage
        isError = {isError}
        flashMsg = {flashMsg}
        setFlashMsg = {setFlashMsg}
      />
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            className="input-username"
            onChange={handleGenericInputChange(setUsername)}
          />
        </div>
        <div>
        password
          <input
            type="text"
            value={password}
            name="Password"
            className="input-password"
            onChange={handleGenericInputChange(setPassword)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm