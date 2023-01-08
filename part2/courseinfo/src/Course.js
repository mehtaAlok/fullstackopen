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

export default Course
