import { useState, useEffect } from "react"
import axios from "axios"
const Details = ({ filter }) => {
  console.log("Details triggered for filter", filter)
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

const Country = ({ filter, filterObject }) => {
  console.log("Component props FILTER", filter)

  const handleClick = (event) => {
    console.log(
      "BUTTON PRESSED",
      filter.map((x, i) => x.name.common)
    )
    console.log("Button event TARGET", filter[event.currentTarget.id])
    filterObject([filter[event.currentTarget.id]])
    console.log("WHAT IS FILTER NOW", filter)
  }

  console.log("WTF is filter: ", filter)

  if (filter == null) {
    console.log("NULL triggered")
    return <> </>
  } else if (filter.length > 10) {
    console.log(">10 Triggered")
    return <>Too many matches, specify another filter</>
  } else if (filter.length === 1) {
    console.log("Length === 1 triggered")
    return <Details filter={filter} />
  }
  console.log("List of countries <10 triggered")

  return (
    <>
      {" "}
      {filter.map((x, i) => (
        <div>
          {/* <li key={i}>{x.name.common}</li> */}
          <>{x.name.common}</>
          <> </>
          {/* {const detailsButton = (props) => { console.log("BUTTON PRESSED", props)}} */}
          <button id={i} onClick={handleClick}>
            {" "}
            Show
          </button>
        </div>
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
    const input = e.target.value
    if (input === "") {
      setFiltObj(null)
    } else {
      const output = country.filter((item) => {
        return item.name.common.toLowerCase().includes(input.toLowerCase())
      })
      setFiltObj(output)
    }
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter input={newFilter} change={filter} />
      <ul>
        <Country filter={newFiltObj} filterObject={setFiltObj} />
      </ul>
    </div>
  )
}

export default App
