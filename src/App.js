import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => { // this will be an async cb
    event.preventDefault()
    let credentials = { username, password }
    try {
      let response = await loginService.login(credentials)
      // console.log('logging in', response)
      // now that we have the response (successfully, this is where we get all the relevant blogs)
      let blogs = await blogService.getUserSpecificBlogs(response)
      setBlogs(blogs)
      setUser(response)
      setUsername('') //clears information
      setPassword('')
    } catch (e) {
      console.error('login unsuccessful', e)
    }
  }

  const handleGenericInputChange = hook => { // pfa
    return event => hook(event.target.value)
  }

  // these components will be optionally rendered
  // loginFormComponent for if user === null
  // loggedInFormComponent for if user !== null
  const loginFormComponent = () => { 
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

  const loggedInComponent = () => {
    return (<div><p>{user.username} is logged in</p></div>)
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? 
        loginFormComponent() : 
        loggedInComponent()
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
