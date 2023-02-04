import { useState } from "react";

const Button = ({ text, clickHandler }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalResponse = good + neutral + bad;
  const averageScore = (good - bad) / totalResponse;
  const goodPercentage = (good / totalResponse) * 100;

  if (totalResponse === 0) {
    return <p>No FeedBack given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="All" value={totalResponse} />
        <StatisticsLine text="Average" value={averageScore} />
        <StatisticsLine text="Positve" value={goodPercentage} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        text="good"
        clickHandler={() => {
          setGood(good + 1);
        }}
      />
      <Button
        text="neutral"
        clickHandler={() => {
          setNeutral(neutral + 1);
        }}
      />
      <Button
        text="bad"
        clickHandler={() => {
          setBad(bad + 1);
        }}
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
