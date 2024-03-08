import React, { useState } from "react";
import anecdotes from "./data";

// { anecdote: "Premature optimization is the root of all evil.", votes: 0 },

export default function App() {
  const [data, setdata] = useState(anecdotes);
  // const [votes, setvotes] = useState(anecdotes);

  const votar = (i)=> {   
    setdata([data[i].votes+=1])
    console.log(data)
  }



  return (
    <div>
      <h1>Anecdotes APP</h1>
      <h3>Create New Anecdote</h3>
      <input type="text" />
      <button>Create</button>
      <div>
        {data.map((el, i) => {
          return (
            <div key={i}>
              {el.anecdote}
              <span>
                <b>Votes {el.votes}</b>
              </span>
              <button onClick={()=>votar(i)}>Votar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
