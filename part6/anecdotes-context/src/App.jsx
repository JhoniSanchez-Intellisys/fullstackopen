import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];
const random = (n) => Math.floor(Math.random(n) * n);

function newObj(keys) {
  let obj = {};
  for (let i = 0; i < keys; i++) {
    let key = i;
    let value = 0;
    obj[key] = value;
  }
  return obj;
}

let points = newObj(anecdotes.length);

// const points = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 }

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setvotes] = useState(points);

  const select = () => setSelected(random(anecdotes.length));
  const valuesObject = Object.values(votes);
  const arrayOrder = valuesObject.sort((a, b) => b - a);
  const maxValue = arrayOrder[0];
  let keyFinded = Object.keys(votes).find((key) => votes[key] === maxValue);

  const upVotes = () => setvotes({ ...votes, [selected]: votes[selected] + 1 });

  console.log(points);
  console.log(votes);
  console.log(valuesObject.sort());
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <div>Has {votes[selected]} votes</div>
      <button onClick={() => select()}>Random Anecdotes</button>
      <button onClick={() => upVotes()}>Vote</button>
      <h2>Anecdotes with most votes</h2>
      <p>
        {" "}
        {anecdotes[keyFinded]} has {votes[keyFinded]} votes
      </p>
    </div>
  );
};

export default App;
