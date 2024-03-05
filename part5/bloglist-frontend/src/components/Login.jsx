import React from "react"

export default function Login({ handleLogin,
  username,
  setUsername,
  password,
  setPassword }) {

  return (
    <div>
      <h2>Loging</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button
          type="submit"
          id="login-button"
        >login</button>
      </form>
    </div>
  )
}
