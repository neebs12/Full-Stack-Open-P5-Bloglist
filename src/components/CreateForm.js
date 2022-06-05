import { useState } from 'react'
import blogService from '../services/blogs'
import FlashMessage from './FlashMessage'

const CreateForm = ({
  blogs, setBlogs
}) => {
  // title, author and url
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [flashMsg, setFlashMsg] = useState('')
  const [isError, setIsError] = useState(null)   

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
      setTitle('')
      setAuthor('')
      setUrl('')

      setIsError(false) // setting successful blog addition message
      setFlashMsg(`Successfully created blog: ${blog.title} by: ${blog.author}`)
    } catch (e) {
      // console.error('form not added: ', e)
      setIsError(true) // setting failed blog addition message
      setFlashMsg(`Unable to created blog`)
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
    <FlashMessage 
      isError = {isError}
      flashMsg = {flashMsg}
      setFlashMsg = {setFlashMsg}
    />
    <form onSubmit = {createBlogHandler}>
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

export default CreateForm