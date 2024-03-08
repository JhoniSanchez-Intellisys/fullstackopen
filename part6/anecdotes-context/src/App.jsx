import { createContext } from "react";
import Anecdotes from "./components/Anecdotes.jsx";
import useAnecdotes from "./hooks/useAnecdotes.js";
import { AnecdotesForm } from "./components/AnecdotesForm.jsx";

export const globalState = createContext();

const App = () => {
  const { anecdotes, selected, votes, select, upVotes, keyFinded, setanecdotes, setvotes } = useAnecdotes();
  const values = {
    anecdotes,
    selected,
    votes,
    select,
    upVotes,
    keyFinded,
    setanecdotes, setvotes
  };

  return (
    <globalState.Provider value={values}>
      <AnecdotesForm />
      <Anecdotes />
    </globalState.Provider>
  );
};

export default App;
