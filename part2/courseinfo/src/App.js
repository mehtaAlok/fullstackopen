// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Course = (course) => {
  return (
    <>
      <h1>{course.course.name}</h1>
      <>
        {course.course.parts.map((x) => (
          <p key={x.id}>
            {x.name} {x.exercises}
          </p>
        ))}
      </>
      <>
        Total of{" "}
        {course.course.parts.map((x) => x.exercises).reduce((a, b) => a + b, 0)}{" "}
        exercises
      </>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
