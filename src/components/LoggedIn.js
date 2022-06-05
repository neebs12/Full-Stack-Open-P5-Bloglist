import { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const LoggedIn = ({
  user, setUser,
  blogs, setBlogs
}) => {
  // title, author and url
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createForm = () => {
    const createBlogHandler = async (event) => {
      event.preventDefault()
      // console.log('form submitted!')
      // create a new blogObject
      let newBlog = { title, author, url }
      try {
        // create a service to accomodate the added blog post
        // BlogService contains a private token variable 
        let blog = await blogService.addNewBlog(newBlog)
        let newBlogs = [...blogs].concat([blog]) // abstracted copy and concat
        setBlogs(newBlogs)
      } catch (e) {
        console.error('form not added: ', e)
      }
    }

    const genericControlledInput = (state, stateChange) => {
      return (
        <input 
          type = "text"
          value = {state}
          onChange = {(event) => stateChange(event.target.value)}
        />
      )
    }

    return (
    <div>
      <form onSubmit={createBlogHandler}>
        <div>
          title: {genericControlledInput(title, setTitle)}
        </div>
        <div>
          author: {genericControlledInput(author, setAuthor)}
        </div>
        <div>
          url: {genericControlledInput(url, setUrl)}
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    )
  }
  
  return (
  <div>
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
    <h2>create new</h2>
    {createForm()}
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}         
  </div>
  )
}

export default LoggedIn