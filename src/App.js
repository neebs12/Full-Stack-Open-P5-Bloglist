import { useState } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

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
        <div>
          <LoggedIn
            user = {user}
            setUser = {setUser}
            setBlogs = {setBlogs}
          />
          <h2>create new</h2>
          <Toggleable displayButtonName="new note" hideButtonName = "cancel">
            <CreateForm
              setBlogs = {setBlogs}
            />
          </Toggleable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id} // warning: this is not a prop! this is for REACT
                blog={blog}
                blogs={blogs} setBlogs={setBlogs}
              />
            )
          }
        </div>
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
