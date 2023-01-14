import { useEffect } from "react"

const Details = ({ filter, setLatLon, newWeather, handleLatLon }) => {
  console.log("LAT & LON for single conutry", [
    filter[0].capitalInfo.latlng[0],
    filter[0].capitalInfo.latlng[1]
  ])
  console.log("WHAT is handleLatLon?", typeof handleLatLon)

  useEffect(() => {
    handleLatLon([
      filter[0].capitalInfo.latlng[0],
      filter[0].capitalInfo.latlng[1]
    ])
  }, [])

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
      <img src={filter[0].flags.png} alt="Country flag" />
      <br />
      <h3>Weather in {filter[0].capital[0]}</h3>
      <>Temperature {newWeather.main.temp} °C</>
      <br />
      <img
        src={`http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <br />
      <>Wind {newWeather.wind.speed} m/s</>
    </>
  )
}

export default Details
