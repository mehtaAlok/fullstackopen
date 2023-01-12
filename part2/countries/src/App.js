import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ filter }) => {
  // console.log("Component props country", country)
  // const filterTime = filter.map((x, i) => x.name.common)
  console.log("Component props FILTER", filter)

  if (filter == null) {
    return <> </>
  } else if (filter.length > 10) {
    return <>Too many matches, specify another filter</>
  } else if (filter.length === 1) {
    return (
      <>
        <h2>{filter[0].name.common}</h2>
        <>Capital: {filter[0].capital[0]}</>
        <br />
        <>Area: {filter[0].area}</>
        <br />
        <br />
        <b>Languages:</b>
        <br />
        <br />
        <ul>
          {Object.values(filter[0].languages).map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        <br />
        <img src={filter[0].flags.png} alt="BigCo Inc. logo" />
      </>
    )
  }

  return (
    <>
      {" "}
      {filter.map((x, i) => (
        <li key={i}>{x.name.common}</li>
      ))}
    </>
  )
}

const Filter = ({ input, change }) => {
  return (
    <>
      {" "}
      Find countries <input value={input} onChange={change}></input>{" "}
    </>
  )
}
const App = () => {
  const [country, setCountry] = useState(null)
  const [newFilter, setFilter] = useState("")
  const [newFiltObj, setFiltObj] = useState(null)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountry(response.data)
    })
  }, [])

  const filter = (e) => {
    setFilter(e.target.value)
    console.log("set filter is", e.target.value)
    const input = e.target.value
    if (input === "") {
      console.log("INPUT is EMPTY")
      setFiltObj(null)
    } else {
      console.log("ELSE triggered")
      const output = country.filter((item) => {
        return item.name.common.toLowerCase().includes(input.toLowerCase())
      })
      setFiltObj(output)
      console.log("OUTPUT is", output)
    }
  }
  return (
    <div>
      <h1>Countries</h1>
      <Filter input={newFilter} change={filter} />
      <ul>
        <Country filter={newFiltObj} />
      </ul>
    </div>
  )
}

export default App
