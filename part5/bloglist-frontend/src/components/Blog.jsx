import { useState } from "react";
// import "../../src/app.css"
import blogs from "../services/blogs";

const Blog = ({ blog, dele }) => {
  const [like, setlikes] = useState(0);
  const [visible, setvisible] = useState(false);

  const stile =   {
    "border": "2px solid rgba(80, 208, 208, 0.774)",
    "margin": "0.3rem",
    "borderRadius": "0.5rem",
    "padding":" 0.3rem",
    /* color: red; */
  }
  const uplikes = async (id, data) => {
    setlikes(() => like + 1);
    await blogs.update(id, data);
  };
  let aa = like === 0 ? 1 : like + 1;
  const date = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + aa,
  };
  const useId = JSON.parse(localStorage.getItem("loggedNoteappUser")).userId === blog.userId;
 
  return (
    <div className="blog" style={useId? stile: null}>
      <h3 style={{ display: "inline" }}>{blog.title}</h3>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.author}</div>
          <button onClick={() => uplikes(blog.id, date)}>
            Likes: {like + blog.likes}
          </button>
        </div>
      )}
      {useId ? (
        <button
          onClick={() => {
            dele(blog.id, blog.title);
          }}
        >
          Delete
        </button>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          setvisible(!visible);
        }}
      >
        {visible ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
};

export default Blog;
