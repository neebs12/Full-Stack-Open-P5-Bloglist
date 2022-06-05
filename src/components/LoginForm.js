const handleGenericInputChange = hook => { // pfa
  return event => hook(event.target.value)
}

const LoginForm = ({
  handleLogin, 
  username, setUsername,
  password, setPassword
}) => { 
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

export default LoginForm