import { useState } from "react";

const Button = ({ hanldlerEvent, text }) => {
  return <button onClick={hanldlerEvent}>{text}</button>;
};

const StatisticsLine = ({ value, text, simbol }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{text}:</td>
          <td>
            {value} {simbol}
          </td>
        </tr>
      </tbody>
    </>
  );
};


const Statistics = ({good, neutral, bad }) => {
  
  const all = good + neutral + bad;
  const Average = (good - bad) / all;
  const Positive = (100 * good) / all;
  return (
    <>
    <h2>Statistics</h2>
      {all != 0 ? (
        <table>
          <StatisticsLine value={good} text="Good" />
          <StatisticsLine value={neutral} text="Neutral" />
          <StatisticsLine value={bad} text="Bad" />
          <StatisticsLine value={all} text="All" simbol={""} />
          <StatisticsLine value={Average} text="Average" />
          <StatisticsLine value={Positive} text="Positive" simbol={"%"} />
        </table>
      ) : (
        <h5>No Fedback Given</h5>
      )}
    </>
  );
};







const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const btnGood = () => setGood(good + 1);
  const btnNeutral = () => setNeutral(neutral + 1);
  const btnBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button hanldlerEvent={btnGood} text={"good"} />
      <Button hanldlerEvent={btnNeutral} text={"neutral"} />
      <Button hanldlerEvent={btnBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
