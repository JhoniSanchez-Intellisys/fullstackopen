import React, { useEffect, useState } from "react";
import { Notification } from "./components/Notification.jsx";
import { getAll, create, update, del } from "../services/anecdotes.js";
// import { useId } from 'react';
import { nanoid } from 'nanoid';

// import  anecdote from "./data.js";   sustituido por el Json Server

export default function App() {
  const [data, setdata] = useState(null);
  const [input, setinput] = useState("");
  const [notif, setnotif] = useState(null);
  // const id = useId();


  const buscadata = async () => {
    const datos = await getAll();
    setdata(datos.data);
    console.log(datos.data);
  };

  useEffect(() => {
    buscadata();
  }, []);

  const votar = async (el, i) => {
    console.log("Este es el Id", i)
    const updatavotes = data.map((anecdote) => {
      if (i === anecdote.id) {
        return { ...anecdote, votes: anecdote.votes + 1 };
      }
      return anecdote;
    });

    console.log(updatavotes);
    const uptadasort = updatavotes.sort((a, b) => b.votes - a.votes);
    console.log(uptadasort);
    setdata(uptadasort);
    await update(i, {...el, votes: el.votes+1} )
    console.log(el.anecdote);
    setnotif(`You voted for: , ${el.anecdote}`);
  };

  const noti = () => {
    setTimeout(() => {
      setnotif(null);
    }, 2000);
  };
  const add = async (e) => {
        e.preventDefault();
    let noteId = nanoid();
    console.log(typeof noteId);
    
    const newAnecdote = { anecdote: input, votes: 0, id:noteId }

    const addanecdote = [...data, newAnecdote];
    setinput("");
    setdata(addanecdote);

    setnotif("New Anecdote Added");
    await create(newAnecdote);
console.log(data);

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
        {data &&
          data.map((el, i) => {
            return (
              <div key={i}>
                {el.anecdote}
                <span>
                  <b>Votes {el.votes} </b>
                </span>
                <button onClick={() => votar(el, el.id)}>Votar</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
