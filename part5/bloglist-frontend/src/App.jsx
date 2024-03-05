import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Login from "./components/Login"
import Formblog from "./components/Formblog"
import Notification from "./components/Notification"
import "./app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, settile] = useState("")
  const [author, setauthor] = useState("")
  const [url, seturl] = useState("")
  const [message, setmessage] = useState(null)
  const [newblogs, setnewBlogs] = useState({})


  const dele = async (id, title) => {
    const result = confirm(`Seguro Eliminar: ${title}`)
    if (result) {
      try {
        const response = await blogService.dele(id)
        const newdata = blogs.filter((el) => el.id !== response.id)
        setBlogs(newdata)

        setmessage(`Blog Deleted ${response.title}`)
        console.log(response)
        console.log(newdata)
      } catch (error) {
        console.log(error)
        setmessage(error.response.data.message)
      }
    }
  }

  const getblog = async () => {
    const ee = await blogService.getAll()
    const filter = ee.sort((a, b) => b.likes - a.likes)
    setBlogs(filter)
  }

  const addnewblog = async (e) => {
    e.preventDefault()

    try {
      console.log("Blog Nuevo", newblogs)
      await blogService.create({
        title: title,
        author: author,
        url: url,
        likes: "0",
        userId: user.userId,
        User: "",
      })
      await getblog()
      setmessage(`Blog Add ${title}`)
    } catch (error) {
      setmessage(`${error.code}`)
      console.log(error)
    }
  }

  useEffect(() => {
    getblog()
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("Primer render")
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [username])

  const handleLogin = async (event) => {
    // setdata(null);
    try {
      event.preventDefault()
      console.log("Request Server", password)
      const response = await blogService.login({
        username: username,
        password: password,
      })
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(response)
      )
      setUser(response)
      // blogService.setToken(response.token);
      console.log("Response Server", response)
      setUsername({})
      setPassword("")
    } catch (error) {
      setmessage(`${error.response.data.error}`)
      console.log(error)
    }
  }
  const handleLoOff = () => {
    location.reload()

    return window.localStorage.removeItem("loggedNoteappUser")
  }
  return (
    <div><h2>Blogs</h2>
      <Notification
        message={message}
        setmessage={setmessage}
      />
      {!user && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          {user !== null && (
            <Formblog

              addnewblog={addnewblog}
              title={title}
              settile={settile}
              author={author}
              setauthor={setauthor}
              url={url}
              seturl={seturl}
            />
          )}


          <h3 style={{ display: "inline" }}>User: {user.username}</h3>    {user && (
            <input
              type="button"
              value={"Cerrar Sesion"}
              onClick={() => handleLoOff()}
            />
          )}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} dele={dele} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
