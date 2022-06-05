import Blog from './Blog'

const LoggedIn = ({
  user, setUser,
  blogs
}) => {
  return (
  <div>
    <p>
      {user.username} is logged in
      <button onClick={() => {
        window.localStorage.clear()
        setUser(null) // change state, trigger re-render 
      }}>
        logout
      </button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}      
  </div>
  )
}

export default LoggedIn