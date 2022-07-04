import { useState } from 'react'
// import blogServices from '../services/blogs'
import PropTypes from 'prop-types'
import FlashMessage from './FlashMessage'

const CreateForm = ({
  addABlog
}) => {
  // title, author and url
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [flashMsg, setFlashMsg] = useState('')
  const [isError, setIsError] = useState(null)

  const createBlogHandler = async (event) => {
    event.preventDefault()
    try {
      await addABlog(title, author, url)
      setTitle('')
      setAuthor('')
      setUrl('')

      setIsError(false) // setting successful blog addition message
      setFlashMsg(`Successfully created blog: ${title} by: ${author}`)
    } catch (e) {
      // console.error('form not added: ', e)
      setIsError(true) // setting failed blog addition message
      setFlashMsg('Unable to created blog')
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
        <div className='title-input'>
        title: {genericControlledInput(title, setTitle)}
        </div>
        <div className='author-input'>
        author: {genericControlledInput(author, setAuthor)}
        </div>
        <div className='url-input'>
        url: {genericControlledInput(url, setUrl)}
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  addABlog: PropTypes.func.isRequired
}

export default CreateForm