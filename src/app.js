import express from 'express'
import connection from './db.js'

import PlayerRouter from './routes/player.js'
import ClubRouter from './routes/club.js'
import MatchRouter from './routes/match.js'
import TournamentRouter from './routes/tournament.js'
import RefereeRouter from './routes/referee.js'

const PORT = process.env.PORT || 3000
const app = express()

connection.connect((err) => {
  if (err) throw err
  console.log('Connected to database')
})

app.use(express.json())

app.use(express.static('public'))

// Ruta para servir tu archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html')
})

app.use('/player', PlayerRouter)
app.use('/club', ClubRouter)
app.use('/match', MatchRouter)
app.use('/tournament', TournamentRouter)
app.use('/referee', RefereeRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

process.on('SIGTERM', () => {
  connection.end(() => {
    console.log('Connection to db closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  connection.end(() => {
    console.log('Connection to db closed')
    process.exit(0)
  })
})
