const LoggedIn = ({
  user, setUser,
  setBlogs,
}) => {

  return (
    <div>
      <h2>blogs</h2>
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
    </div>
  )
}

export default LoggedIn