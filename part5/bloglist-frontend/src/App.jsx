import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Formblog from "./components/Formblog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, settile] = useState("");
  const [author, setauthor] = useState("");
  const [url, seturl] = useState("");

  const [newblogs, setnewBlogs] = useState({});

  const addnewblog = async (e) => {
    e.preventDefault();

    try {
      console.log("Blog Nuevo", newblogs);
      const response = await blogService.create({
        title: title,
        author: author,
        url: url,
        likes: "0",
        userId: user.userId,
        User: "",
      });
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("Primer render");
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    // setdata(null);
    try {
      event.preventDefault();
      console.log("Request Server", password);
      const response = await blogService.login({
        username: username,
        password: password,
      });
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(response)
      );
      setUser(response);
      // blogService.setToken(response.token);
      console.log("Response Server", response);
      setUsername({});
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoOff = () => {
    location.reload();
    return window.localStorage.removeItem("loggedNoteappUser");
  };
  return (
    <div>
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
          {user && (
            <input
              type="button"
              value={"Cerrar"}
              onClick={() => handleLoOff()}
            />
          )}
          <h2>Blogs</h2>
          <h3>User: {user.username}</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
