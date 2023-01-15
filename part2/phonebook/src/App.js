import { useState, useEffect } from "react"
// import axios from "axios"
import phonebookService from "./services/notes"

const Person = ({ person, filter }) => {
  if (filter) {
    return filter.map((x, i) => (
      <li key={i}>
        {x.name} {x.number}
      </li>
    ))
  }
  return person.map((x, i) => (
    <li key={i}>
      {x.name} {x.number}
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
        <input value={valNum} onChange={numChange} id="number" name="number" />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [newFilterObj, setFilterObj] = useState(null)

  // const url = "http://localhost:3001/persons"
  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName }
    const phoneObject = { number: newNumber }

    const found = persons.find((e) => {
      return e.name === newName
    })

    if (found) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }
    const newPersonObj = { ...personObject, ...phoneObject }
    setPersons(persons.concat(newPersonObj))

    phonebookService.create(newPersonObj).then((response) => {
      setPersons(persons.concat(response))
    })

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
