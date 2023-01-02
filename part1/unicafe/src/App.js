import { useState } from "react"

const Display = (props) => {
  return (
    <>
      <br />
      <div>
        {props.text} {props.count}
      </div>
    </>
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
  const all = good + neutral + bad

  return (
    <div>
      <font size="+2">Give Feedback</font>
      <br />
      <br />
      <button onClick={increaseGood}>Good</button>
      <button onClick={increaseNeutral}>Neutral</button>
      <button onClick={increaseBad}>Bad</button>
      <br />
      <br />
      <font size="+2">Statistics</font>
      <br />
      <Display count={good} text="Good" />
      <Display count={neutral} text="Neutral" />
      <Display count={bad} text="Bad" />
      <br />
      <>All {all}</>
      <br />
      <>Average {(good - bad) / all}</>
      <br />
      <>Positive {good / all}%</>
    </div>
  )
}

export default App
