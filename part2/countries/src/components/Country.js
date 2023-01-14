import Details from "./Details"

const Country = ({
  filter,
  filterObject,
  setLatLon,
  newWeather,
  handleLatLon
}) => {
  const handleClick = (event) => {
    console.log("Button event TARGET", filter[event.currentTarget.id])
    filterObject([filter[event.currentTarget.id]])
  }

  if (filter == null) {
    return <> </>
  } else if (filter.length > 10) {
    return <>Too many matches, specify another filter</>
  } else if (filter.length === 1) {
    return (
      <Details
        filter={filter}
        setLatLon={setLatLon}
        newWeather={newWeather}
        handleLatLon={handleLatLon}
      />
    )
  }

  return (
    <>
      {" "}
      {filter.map((x, i) => (
        <div key={i}>
          <>{x.name.common}</>
          <> </>
          <button id={i} onClick={handleClick}>
            {" "}
            Show
          </button>
        </div>
      ))}
    </>
  )
}

export default Country
