import { useState, useEffect } from "react"
import axios from "axios"

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

const Filter = ({ input, change }) => {
  return (
    <>
      {" "}
      Filter shown with <input value={input} onChange={change}></input>
    </>
  )
}

const PersonForm = ({ submit, valName, nameChange, valNum, numChange }) => {
  return (
    <form onSubmit={submit}>
      <div>
        Name:{" "}
        <input value={valName} onChange={nameChange} id="name" name="name" />
      </div>
      <div>
        Number:{" "}
        <input value={valNum} onChange={numChange} id="phone" name="phone" />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", phone: "040-1234567" },
    // { name: "Ada Lovelaace", phone: "39-44-5323523" },
    // { name: "Dan Abramov", phone: "12-43-234345" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [newFilterObj, setFilterObj] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  }, [])

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
    if (e.target.value === "") {
      setFilterObj(null)
    } else {
      const input = e.target.value
      const output = persons.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase())
      })

      setFilterObj(output)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={newFilter} change={filter} />
      <h2>Add a new</h2>
      <PersonForm
        submit={addPerson}
        valName={newName}
        nameChange={handleChange}
        valNum={newNumber}
        numChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <ul>
        <Person person={persons} filter={newFilterObj} />
      </ul>
    </div>
  )
}

export default App
