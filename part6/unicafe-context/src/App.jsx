import { createContext, useState } from "react";
import { Buttons } from "./components/Buttons.jsx";
import { Statistics } from "./components/Statistics.jsx";

export const contextGlobal = createContext();

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const btnGood = () => setGood(good + 1);
  const btnNeutral = () => setNeutral(neutral + 1);
  const btnBad = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const Average = (good - bad) / all;
  const Positive = (100 * good) / all;

  const values = {
    good,
    neutral,
    bad,
    btnGood,
    btnNeutral,
    btnBad,
    all,
    Average,
    Positive,
    text: ["good", "neutral", "bad", "All", "Average", "Positive"],
  };

  return (
    <div>
      <h1>Give FeedBack</h1>
      <contextGlobal.Provider value={values}>
        <Buttons />
        <Statistics />
      </contextGlobal.Provider>
    </div>
  );
};

export default App;
