// const express = require('express')
// const connectionFactory = require('../db-config/db-connection')

// var router = express.Router()
// var connectionPromise = connectionFactory.getConnection()

// router.post('/', function (req, res) {
//   var students = req.body

//   connectionPromise
//     .then((connection) => {
//       connection
//         .execute('INSERT INTO students VALUES (?, ?, ?, ?, ?)', [
//           students.id,
//           students.name,
//           students.age,
//           students.major,
//           students.year,
//         ])
//         .then(() => {
//           res.send('Student inserted successfully.')
//         })
//         .catch((error) => {
//           console.log('Error while inserting data.', error)
//           res.status(500).send('Error while inserting data.')
//         })
//     })
//     .catch((error) => {
//       console.error('Unable to establish a database connection:', error)
//       res.status(500).send('Unable to establish a database connection.')
//     })
// })

// module.exports = router
const express = require('express')
const { sequelize } = require('../db-config/db-connection')
const Sequelize = require('sequelize')

const router = express.Router()
const Student = sequelize.define(
  'student',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    major: Sequelize.STRING,
    year: Sequelize.INTEGER,
  },
  {
    timestamps: false, // Disable timestamps
  }
)

router.post('/', function (req, res) {
  const students = req.body

  Student.create(students)
    .then(() => {
      res.send('Student inserted successfully.')
    })
    .catch((error) => {
      console.log('Error while inserting data.', error)
      res.status(500).send('Error while inserting data.')
    })
})

module.exports = router
/*
http://localhost:9090/insert

{
        "id": "1",
        "name": "laptop",
        "price": "5000"
}
*/