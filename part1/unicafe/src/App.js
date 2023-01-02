import { useState } from "react"

// const Display = (props) => {
//   return (
//     <>
//       <br />
//       <div>
//         {props.text} {props.count}
//       </div>
//     </>
//   )
// }
const Statistics = (props) => {
  const all = props.count[0] + props.count[1] + props.count[2]

  return (
    <>
      <div>Good {props.count[0]}</div>
      <div>Neutral {props.count[1]}</div>
      <div>Bad {props.count[2]}</div>
      <div>All {all}</div>
      <div>Average {(props.count[0] - props.count[2]) / all}</div>
      <div>Positive {(props.count[0] / all) * 100}%</div>
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
      <Statistics count={[good, neutral, bad]} />
      {/* <Display count={good} text="Good" />
      <Display count={neutral} text="Neutral" />
      <Display count={bad} text="Bad" /> */}
    </div>
  )
}

export default App
