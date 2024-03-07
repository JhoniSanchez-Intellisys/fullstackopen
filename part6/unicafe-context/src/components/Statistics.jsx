import { useContext } from "react";
import { StatisticsLine } from "./StatisticsLine.jsx";
import { contextGlobal } from "../App.jsx";

export const Statistics = () => {
  const { good, neutral, bad, all, Average, Positive, text } = useContext(contextGlobal);
  return (
    <>
      <h2>Statistics</h2>
      {all != 0 ? (
        <table>
          <StatisticsLine value={good} text={text[0]} />
          <StatisticsLine value={neutral} text={text[1]} />
          <StatisticsLine value={bad} text={text[2]} />
          <StatisticsLine value={all} text={text[3]} simbol={""} />
          <StatisticsLine value={Average} text={text[4]} />
          <StatisticsLine value={Positive} text={text[5]} simbol={"%"} />
        </table>
      ) : (
        <h5>No Fedback Given</h5>
      )}
    </>
  );
};
