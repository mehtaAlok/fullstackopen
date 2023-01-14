import { useState, useEffect } from "react"
import axios from "axios"
import Country from "./components/Country"

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
  const [newLatLon, setLatLon] = useState([44.34, 10.99])
  const [newWeather, setWeather] = useState("")

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountry(response.data)
    })
  }, [api_key])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${newLatLon[0]}&lon=${newLatLon[1]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        console.log("weahter response is", response.data.wind.speed)
        setWeather(response.data)
      })
    console.log("In useEffect hook")
  }, [api_key, newLatLon])

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

  const handleLatLon = (e) => {
    console.log("Calling handleLatLon")
    setLatLon(e)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter input={newFilter} change={filter} />
      <ul>
        <Country
          filter={newFiltObj}
          filterObject={setFiltObj}
          setLatLon={setLatLon}
          newWeather={newWeather}
          handleLatLon={handleLatLon}
        />
      </ul>
    </div>
  )
}

export default App
