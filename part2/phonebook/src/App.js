import { useState } from "react"

const Person = (person) => {
  return <li>{person.person.name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName }
    const found = persons.find(
      (e) => JSON.stringify(e) === JSON.stringify(personObject)
    )
    if (JSON.stringify(personObject) === JSON.stringify(found)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((x) => (
          <Person person={x} key={x.name} />
        ))}
      </ul>
    </div>
  )
}

export default App
