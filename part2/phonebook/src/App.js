import { useState, useEffect } from "react"
import axios from "axios"
import phonebookService from "./services/notes"
import "./index.css"

const Notification = ({ message }) => {
  const footerStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return <div style={footerStyle}>Added {message}</div>
}

const Person = ({ person, filter, clickAction }) => {
  if (filter) {
    return filter.map((x, i) => (
      <div key={i}>
        <>
          {x.name} {x.number}
          {""}
        </>
        <button id={x.id} onClick={clickAction}>
          Delete
        </button>
      </div>
    ))
  }
  return person.map((x, i) => (
    <div key={i}>
      {x.name} {x.number} {""}
      <button id={x.id} onClick={clickAction}>
        Delete
      </button>
    </div>
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
  const [success, setsuccess] = useState(null)

  const url = "http://localhost:3001/persons"
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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        axios
          .put(`${url}/${found.id}`, { name: newName, number: newNumber })
          .then(() => {
            phonebookService.getAll().then((response) => {
              setPersons(response)
            })
          })
      }
      setNewName("")
      setNumber("")
      setsuccess(newName)
      setTimeout(() => {
        setsuccess(null)
      }, 5000)
      return
    }
    const newPersonObj = { ...personObject, ...phoneObject }
    setPersons(persons.concat(newPersonObj))

    phonebookService.create(newPersonObj).then((response) => {
      setPersons(persons.concat(response))
    })

    setsuccess(newName)
    setTimeout(() => {
      setsuccess(null)
    }, 5000)

    setNewName("")
    setNumber("")
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNumber(e.target.value)
  }

  const clickAction = (e) => {
    const i = Number(e.target.id)
    const displayName = persons.filter((item) => item.id === i)

    if (window.confirm(`Delete ${displayName[0].name}?`)) {
      axios.delete(`${url}/${i}`).then(() => {
        phonebookService.getAll().then((response) => {
          setPersons(response)
        })
      })
    }
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
      <Notification message={success} />

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
      <>
        <Person
          person={persons}
          filter={newFilterObj}
          clickAction={clickAction}
        />
      </>
    </div>
  )
}

export default App
