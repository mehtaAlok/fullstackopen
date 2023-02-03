const mongoose = require("mongoose")
const password = process.argv[2]

const url = `mongodb+srv://fullstack2023:${password}@cluster0.frqzab4.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Phonebook = mongoose.model("Phonebook", phoneSchema)

if (process.argv.length < 4) {
  console.log("Phonebook:")
  Phonebook.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry.name, entry.number)
    })
    mongoose.connection.close()
  })
} else {
  const phone = new Phonebook({
    name: process.argv[3],
    number: process.argv[4]
  })

  phone.save().then((result) => {
    console.log("Added ", result.name, "number", result.number, "to phonebook")
    console.log("what is phone?", phone)
    mongoose.connection.close()
  })
}
