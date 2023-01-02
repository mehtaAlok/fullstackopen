import { useState } from "react"

const Button = (props) => {
  return (
    <>
      <button onClick={props.click}>{props.text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return "No feedback given"
  }

  return (
    <div>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={(good - bad) / all} />
      <StatisticLine text="Positive" value={`${(good / all) * 100}%`} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <font size="+2">Give Feedback</font>
      <br />
      <br />
      <Button click={increaseGood} text={"Good"} />
      <Button click={increaseNeutral} text={"Neutral"} />
      <Button click={increaseBad} text={"Bad"} />
      <br />
      <br />
      <font size="+2">Statistics</font>
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
