import React, { useEffect, useState } from "react";
import { Notification } from "./components/Notification.jsx";
import { getAll, create, update, del } from "../services/anecdotes.js";
// import { useId } from 'react';
import { nanoid } from "nanoid";

// import  anecdote from "./data.js";   sustituido por el Json Server

export default function App() {
  const [data, setdata] = useState(null);
  const [input, setinput] = useState("");
  const [notif, setnotif] = useState(null);
  // const id = useId();

  const buscadata = async () => {
    try {
      const datos = await getAll();
      setdata(datos.data);
    } catch (error) {
      console.log(error);
      setnotif(error.message);
    }

    // console.log(datos.data);
  };

  useEffect(() => {
    buscadata();
  }, []);

  const votar = async (el, i) => {
    try {
      const updatavotes = data.map((anecdote) => {
        if (i === anecdote.id) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
      const uptadasort = updatavotes.sort((a, b) => b.votes - a.votes);
      setdata(uptadasort);

      const requ = await update(i, { ...el, votes: el.votes + 1 });
      console.log(requ);
      setnotif(`You voted for: , ${el.anecdote}`);
    } catch (error) {
      setnotif(error.message);
      console.log(error.message);
    }
  };

  const noti = () => {
    setTimeout(() => {
      setnotif(null);
    }, 2000);
  };
  const add = async (e) => {
    e.preventDefault();
    try {
      let noteId = nanoid();
      const newAnecdote = { anecdote: input, votes: 0, id: noteId };
      await create(newAnecdote);
      const addanecdote = [...data, newAnecdote];
      setinput("");
      setdata(addanecdote);
      setnotif("New Anecdote Added");
    } catch (error) {
      setnotif(error.message);
      console.log(error.message);
    }
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
