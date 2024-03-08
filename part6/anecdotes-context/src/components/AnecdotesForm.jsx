import React, { useContext, useState } from "react";
import { globalState } from "../App";

export function AnecdotesForm() {
  const { setanecdotes, anecdotes, setvotes,
    votes } = useContext(globalState);
  const [input, setinput] = useState("");

  const ad = () => {
    setanecdotes([...anecdotes, input]);
    setvotes({...votes,  [Object.keys(votes).length]: 0 });
  };

  return (
    <div>
      <h2>AnecdotesForm</h2>
      <input
        type="text"
        value={input}
        onChange={({ target }) => setinput(target.value)}
      />
      <button onClick={ad}>Agregar Anecdote</button>
    </div>
  );
}
