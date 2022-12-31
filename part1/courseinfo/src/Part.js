const Part = (props) => {
  console.log("Part", props)
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

export default Part
