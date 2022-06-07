import {useState} from 'react'
import Toggleable from "./Toggleable"

const Blog = ({blog}) => {
  // cannot use toggleable component directly 
  // -- as button does not appear adjacent to blog
  const [visibility, setVisibility] = useState(false)
  const displayVisibility = {display: visibility ? '' : 'none'}
  const buttonName = visibility ? 'view' : 'hide'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const BlogDetails = (props) => {
    // displays blog.url, blog.likes, blog.user.username
    return (
      <div>
        {blog.url} <br></br>
        likes {blog.likes} <button>like</button><br></br>
        {blog.user.username}<br></br>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={() => setVisibility(!visibility)}>{buttonName}</button>
      <div style={displayVisibility}>
        <BlogDetails />
      </div>
    </div>  
  )
}

export default Blog