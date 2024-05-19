import express from 'express'
import connection from './db.js'
const PORT = process.env.PORT || 3000

const app = express()

connection.connect((err) => {
  if (err) throw err
  console.log('Connected to database')
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/jugador', (req, res) => {
  connection.query('SELECT * FROM jugador;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
