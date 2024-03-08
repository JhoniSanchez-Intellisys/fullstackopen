import React, { useContext } from "react";
import { globalState } from "../App";
// import { AnecdotesForm } from "./AnecdotesForm.jsx";

export default function Anecdotes() {
  const { anecdotes, selected, votes, select, upVotes, keyFinded } =
    useContext(globalState);

  console.log(anecdotes);
  console.log(votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <div>Has {votes[selected]} votes</div>
      <button onClick={() => select()}>Random Anecdotes</button>
      <button onClick={() => upVotes()}>Vote</button>
      <h2>Anecdotes with most votes</h2>
      <p>
        {anecdotes[keyFinded]} has {votes[keyFinded]} votes
      </p>
      {anecdotes.map((el, i) => (
        <div key={i}>
          {el} <b>Votos {votes[i]}</b>
        </div>
      ))}
      
    </div>
  );
}
