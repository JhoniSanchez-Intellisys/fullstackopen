import React, { useState } from "react"
import PropTypes from "prop-types"

export default function Formblog(
  { addnewblog,
    title,
    settile,
    author,
    setauthor,
    url,
    seturl }
) {

  const [visible, setvisible] = useState(true)

  return (
    <div>{visible && <form onSubmit={(e) => addnewblog(e)}>
      <h2>Blog Form</h2>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => settile(e.target.value)}
        id="blog-input"
      />
      <input
        placeholder="author"
        value={author}
        onChange={(e) => setauthor(e.target.value)}
        id="author"
      />
      <input
        placeholder="url"
        value={url}
        onChange={(e) => seturl(e.target.value)}
        id="url"
      />

      <button id="save" type="submit">save</button>

    </form>}
    <button onClick={() => setvisible(!visible)}>{visible ? "Cancel" : "NewBlog"}</button>
    </div>
  )
}
// Formblog.propTypes = {
//   addnewblog: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   settile: PropTypes.func.isRequired,
//   author: PropTypes.string.isRequired,
//   setauthor: PropTypes.func.isRequired,
//   url: PropTypes.string.isRequired,
//   seturl: PropTypes.func.isRequired,
// }
