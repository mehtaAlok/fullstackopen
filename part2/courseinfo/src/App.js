const Course = (course) => {
  const exerciseArr = course.course.parts.map((x) => x.exercises)
  const total = exerciseArr.reduce((a, b) => a + b, 0)

  return (
    <>
      <h2>{course.course.name}</h2>
      <>
        {course.course.parts.map((x) => (
          <p key={x.id}>
            {x.name} {x.exercises}
          </p>
        ))}
      </>
      <b>Total of {total} exercises</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((x) => {
        return <Course course={x} key={x.id}></Course>
      })}
    </div>
  )
}

export default App
