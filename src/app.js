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
app.get('/jugador/:id', (req, res) => {
  const jugadorId = req.params.id
  connection.query(
    `SELECT * FROM jugador WHERE ID = ? ;`,
    [jugadorId],
    (err, rows, fields) => {
      if (err) throw err
      res.json(rows)
    }
  )
})

app.get('/club', (req, res) => {
  connection.query('SELECT * FROM club;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
})

app.get('/torneo', (req, res) => {
  connection.query('SELECT * FROM torneo;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
})

app.get('/arbitro', (req, res) => {
  connection.query('SELECT * FROM arbitro;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
})

app.get('/partido', (req, res) => {
  connection.query('SELECT * FROM partido;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
})

app.get('/partido/:id', (req, res) => {
  const partidoId = req.params.id
  connection.query(
    `SELECT p.ID AS partido_id,
              p.ID_arbitro,
              p.ID_jugador1,
              CONCAT(j1.nombre, ' ', j1.apellido) AS nombre_jugador1,
              j1.rating AS jugador1_rating,
              p.ID_jugador2,
              CONCAT(j2.nombre, ' ', j2.apellido) AS nombre_jugador2,
              j2.rating AS jugador2_rating,
              p.ID_torneo,
              p.instancia,
              s.numero_set,
              s.player1_games_won,
              s.player2_games_won
       FROM partido p
       LEFT JOIN sets s ON p.ID = s.ID_partido
       INNER JOIN jugador j1 ON p.ID_jugador1 = j1.ID
       INNER JOIN jugador j2 ON p.ID_jugador2 = j2.ID
       WHERE p.ID = ?
       ORDER BY s.numero_set ASC`,
    [partidoId],
    (err, rows, fields) => {
      if (err) throw err

      if (rows.length === 0) {
        res.status(404).json({ message: 'Partido no encontrado' })
        return
      }

      const partido = {
        ID: rows[0].partido_id,
        ID_arbitro: rows[0].ID_arbitro,
        ID_jugador1: rows[0].ID_jugador1,
        nombre_jugador1: rows[0].nombre_jugador1,
        jugador1_rating: rows[0].jugador1_rating,
        ID_jugador2: rows[0].ID_jugador2,
        nombre_jugador2: rows[0].nombre_jugador2,
        jugador2_rating: rows[0].jugador2_rating,
        ID_torneo: rows[0].ID_torneo,
        instancia: rows[0].instancia,
        sets: rows.map((row) => ({
          numero_set: row.numero_set,
          player1_games_ganados: row.player1_games_won,
          player2_games_ganados: row.player2_games_won,
        })),
      }

      res.json(partido)
    }
  )
})

app.get('/estadisticas_jugadores', (req, res) => {
  connection.query(
    'SELECT * FROM estadisticas_jugadores;',
    (err, rows, fields) => {
      if (err) throw err
      res.json(rows)
    }
  )
})

app.get('/puntaje_maximo_club', (req, res) => {
  connection.query(
    'SELECT * FROM puntaje_maximo_club ORDER BY puntaje_maximo DESC;',
    (err, rows, fields) => {
      if (err) throw err
      res.json(rows)
    }
  )
})

app.get('/ranking_jugadores', (req, res) => {
  connection.query('SELECT * FROM ranking_jugadores;', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
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
