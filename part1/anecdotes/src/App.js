import { useState } from "react"

const Anecdote = ({ text, voteCount }) => {
  return (
    <>
      {text}
      <div>has {voteCount} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients."
  ]

  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(new Uint8Array(7))
  const mostVotes = Math.max(...point)

  const handleVote = () => {
    const vote = [...point]
    vote[selected] += 1
    setPoint(vote)
  }

  const pointMost = point.findIndex((val) => val === mostVotes)
  console.log("pointMost", pointMost)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} voteCount={point[selected]} />
      <button onClick={() => handleVote()}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>
        New anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[pointMost]} voteCount={mostVotes} />
    </div>
  )
}

export default App
