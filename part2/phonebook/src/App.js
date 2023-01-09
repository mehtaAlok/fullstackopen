import { useState } from "react"

const Person = (person) => {
  return (
    <li>
      {person.person.name} {person.person.phone}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNumber] = useState("")

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName }
    const phoneObject = { phone: newNumber }
    console.log("new name is", newName)
    const found = persons.find((e) => {
      console.log("what is e", e.name)
      return e.name === newName
    })
    if (found) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }
    const newPersonObj = [{ ...personObject, ...phoneObject }]
    setPersons(persons.concat(newPersonObj))
    setNewName("")
    setNumber("")
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handlePhoneChange} />
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
