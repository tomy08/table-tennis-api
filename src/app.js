import express from 'express'
import connection from './db.js'
import Match from './models/Match.js'
import Player from './models/Player.js'
import Club from './models/Club.js'
import Tournament from './models/Tournament.js'
import Referee from './models/Referee.js'
import PlayerStatistics from './models/PlayerStatistics.js'
import ClubScore from './models/ClubScore.js'

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

app.get('/player', (req, res) => {
  connection.query('SELECT * FROM jugador;', (err, rows) => {
    if (err) throw err
    res.json(Player.fromDbRows(rows))
  })
})

app.get('/player/:id', (req, res) => {
  const playerId = req.params.id
  connection.query(
    'SELECT * FROM jugador WHERE ID = ?;',
    [playerId],
    (err, rows) => {
      if (err) throw err
      if (rows.length === 0) {
        res.status(404).json({ message: 'Player not found' })
        return
      }
      res.json(Player.fromDbRow(rows[0]))
    }
  )
})

app.get('/club', (req, res) => {
  connection.query('SELECT * FROM club;', (err, rows) => {
    if (err) throw err
    res.json(Club.fromDbRows(rows))
  })
})

app.get('/club/:id', (req, res) => {
  const clubId = req.params.id
  connection.query(
    'SELECT * FROM club WHERE ID = ?;',
    [clubId],
    (err, rows) => {
      if (err) throw err
      if (rows.length === 0) {
        res.status(404).json({ message: 'Club not found' })
        return
      }
      res.json(Club.fromDbRow(rows[0]))
    }
  )
})

app.get('/tournament', (req, res) => {
  connection.query('SELECT * FROM torneo;', (err, rows) => {
    if (err) throw err
    res.json(Tournament.fromDbRows(rows))
  })
})

app.get('/tournament/:id', (req, res) => {
  const tournamentId = req.params.id
  connection.query(
    'SELECT * FROM torneo WHERE ID = ?;',
    [tournamentId],
    (err, rows) => {
      if (err) throw err
      if (rows.length === 0) {
        res.status(404).json({ message: 'Tournament not found' })
        return
      }
      res.json(Tournament.fromDbRow(rows[0]))
    }
  )
})

app.get('/referee', (req, res) => {
  connection.query('SELECT * FROM arbitro;', (err, rows) => {
    if (err) throw err
    res.json(Referee.fromDbRows(rows))
  })
})

app.get('/referee/:id', (req, res) => {
  const refereeId = req.params.id
  connection.query(
    'SELECT * FROM arbitro WHERE ID = ?;',
    [refereeId],
    (err, rows) => {
      if (err) throw err
      if (rows.length === 0) {
        res.status(404).json({ message: 'Referee not found' })
        return
      }
      res.json(Referee.fromDbRow(rows[0]))
    }
  )
})

app.get('/match', (req, res) => {
  connection.query(
    'SELECT * FROM MatchView ORDER BY match_id ASC;',
    (err, rows) => {
      if (err) throw err
      res.json(Match.fromDbRows(rows))
    }
  )
})

app.get('/match/:id', (req, res) => {
  const matchId = req.params.id
  connection.query(
    'SELECT * FROM MatchView WHERE match_id = ?;',
    [matchId],
    (err, rows) => {
      if (err) throw err
      if (rows.length === 0) {
        res.status(404).json({ message: 'Match not found' })
        return
      }
      res.json(Match.fromDbRow(rows[0]))
    }
  )
})

app.get('/player_statistics', (req, res) => {
  connection.query('SELECT * FROM estadisticas_jugadores;', (err, rows) => {
    if (err) throw err
    res.json(PlayerStatistics.fromDbRows(rows))
  })
})

app.get('/club_score', (req, res) => {
  connection.query(
    'SELECT * FROM puntaje_maximo_club ORDER BY puntaje_maximo DESC;',
    (err, rows) => {
      if (err) throw err
      res.json(ClubScore.fromDbRows(rows))
    }
  )
})

app.get('/player_ranking', (req, res) => {
  connection.query('SELECT * FROM ranking_jugadores;', (err, rows) => {
    if (err) throw err
    res.json(Player.fromDbRows(rows))
  })
})

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
