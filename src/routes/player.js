import { Router } from 'express'

import connection from '../db.js'

import Player from '../models/Player.js'
import PlayerStatistics from '../models/PlayerStatistics.js'

const router = Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM jugador;', (err, rows) => {
    if (err) throw err
    res.json(Player.fromDbRows(rows))
  })
})

router.get('/stats', (req, res) => {
  connection.query('SELECT * FROM estadisticas_jugadores;', (err, rows) => {
    if (err) throw err
    res.json(PlayerStatistics.fromDbRows(rows))
  })
})

router.get('/ranking', (req, res) => {
  connection.query('SELECT * FROM ranking_jugadores;', (err, rows) => {
    if (err) throw err
    res.json(Player.fromDbRows(rows))
  })
})

router.get('/:id', (req, res) => {
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

export default router
