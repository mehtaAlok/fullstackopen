import { useState } from "react"

const Person = ({ person, filter }) => {
  if (filter) {
    return filter.map((x, i) => (
      <li key={i}>
        {x.name} {x.phone}
      </li>
    ))
  }

  return person.map((x, i) => (
    <li key={i}>
      {x.name} {x.phone}
    </li>
  ))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
    { name: "Ada Lovelaace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Alok Mehta", phone: "07446-090-123" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [newFilterObj, setFilterObj] = useState(null)

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName }
    const phoneObject = { phone: newNumber }
    const found = persons.find((e) => {
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

  const filter = (e) => {
    setFilter(e.target.value)
    const input = e.target.value

    const output = persons.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })

    setFilterObj(output)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input value={newFilter} onChange={filter}></input>
      <h2>Add a new</h2>
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
        <Person person={persons} filter={newFilterObj} />
      </ul>
    </div>
  )
}

export default App
