const { response } = require("express")
const express = require("express")
const app = express()
app.use(express.json())
const morgan = require("morgan")

const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body)
})

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.use(morgan("tiny"), morgan(":body"))

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>")
})

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br></br>${Date()}`
  )
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = "This person does not exist"
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  const duplicateName = persons.filter((x) => x.name === body.name)

  if (!body || !body.name || !body.number) {
    return response.status(400).json({ error: "Content missing" })
  } else if (Object.keys(duplicateName).length > 0) {
    return response.status(400).json({ error: "Name must be unique" })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
