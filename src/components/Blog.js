import {useState} from 'react'
import blogServices from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  // cannot use toggleable component directly 
  // -- as button does not appear adjacent to blog
  const [visibility, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const displayVisibility = {display: visibility ? '' : 'none'}
  const buttonName = visibility ? 'view' : 'hide'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeHandler = async () => {
    // we have blog, need to deep copy for REACT convention
    let copiedBlog = JSON.parse(JSON.stringify(blog))
    // need to extract existing id
    let id = copiedBlog.id
    // need to replace blog.user from {...} to just userid
    let userId = copiedBlog.user.id
    copiedBlog.user = userId
    // need to increment likes
    copiedBlog.likes = copiedBlog.likes + 1
    // send update to the server
    await blogServices.updateABlog(id, copiedBlog)
    let updateBlogs = await blogServices.getUserSpecificBlogs(
      JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    ) // lol shortcut
    setLikes(likes + 1)
    setBlogs(updateBlogs)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={() => setVisibility(!visibility)}>{buttonName}</button>
      <div style={displayVisibility}>
        {blog.url} <br></br>
        likes {likes} 
        <button onClick={likeHandler}>
          like
        </button><br></br>
        {blog.user.username}<br></br>
      </div>
    </div>  
  )
}

export default Blog