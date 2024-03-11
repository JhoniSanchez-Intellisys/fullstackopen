import React, { useState } from "react";
import anecdotes from "./data";
import { Notification } from "./components/Notification.jsx";

export default function App() {
  const [data, setdata] = useState(anecdotes);
  const [input, setinput] = useState("");
  const [notif, setnotif] = useState(null);

  const votar = (el, i) => {
    const updatavotes = data.map((anecdote, index) => {
      if (i === index) {
        return { ...anecdote, votes: anecdote.votes + 1 };
      }
      return anecdote;
    });

    console.log(updatavotes);
    const uptadasort = updatavotes.sort((a, b) => b.votes - a.votes);
    console.log(uptadasort);
    setdata(uptadasort);
    console.log( el.anecdote)
    setnotif(`You voted for: , ${el.anecdote}`);
  };

  const noti = () => {
    setTimeout(() => {
      setnotif(null);
    }, 2000);
  };
  const add = (e) => {
    e.preventDefault();
    const addanecdote = [...data, { anecdote: input, votes: 0 }];
    setinput("");
    setdata(addanecdote);
    setnotif("New Anecdote Added");
    console.log(anecdotes);
    noti();
  };

  return (
    <div>
      <Notification mensage={notif} />
      <h1>Anecdotes APP</h1>

      <h3>Create New Anecdote</h3>
      <form onSubmit={(e) => add(e)}>
        <input onChange={(e) => setinput(e.target.value)} value={input} />
        <button type="submit">Create</button>
      </form>

      <div>
        {data.map((el, i) => {
          return (
            <div key={i}>
              {el.anecdote}
              <span>
                <b>Votes {el.votes}</b>
              </span>
              <button onClick={() => votar(el, i)}>Votar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
