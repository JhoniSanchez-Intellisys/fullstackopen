import React from "react";

export default function Formblog(
 {addnewblog,
  title,
  settile,
  author,
  setauthor,
  url,
  seturl} 
) {
  return (
    <div>
      <form onSubmit={(e) => addnewblog(e)}>
        <h2>Blog Form</h2>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => settile(e.target.value)}
        />
        <input
          placeholder="author"
          value={author}
          onChange={(e) => setauthor(e.target.value)}
        />
        <input
          placeholder="url"
          value={url}
          onChange={(e) => seturl(e.target.value)}
        />

        <button type="submit">save</button>
      </form>
    </div>
  );
}
