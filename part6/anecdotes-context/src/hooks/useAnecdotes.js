import { newObj } from "../function/newObj.js";
import anecdotess from "../data.js";
import { useEffect, useState } from "react";

const random = (n) => Math.floor(Math.random(n) * n);

export default function useAnecdotes() {
  const [anecdotes, setanecdotes] = useState(anecdotess);
  const [selected, setSelected] = useState(0);
  let points = newObj(anecdotes.length);

  const [votes, setvotes] = useState(points);

//   useEffect(() => {
//     setvotes({...votes,  [Object.keys(votes).length + 1]: 0 });
//   }, [anecdotes]);


  const select = () => setSelected(random(anecdotes.length));
  const valuesObject = Object.values(votes);
  const arrayOrder = valuesObject.sort((a, b) => b - a);
  const maxValue = arrayOrder[0];
  let keyFinded = Object.keys(votes).find((key) => votes[key] === maxValue);
  const upVotes = () => setvotes({ ...votes, [selected]: votes[selected] + 1 });

  return {
    anecdotes,
    selected,
    votes,
    select,
    upVotes,
    keyFinded,
    setanecdotes,setvotes
  };
}
