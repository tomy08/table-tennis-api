import connection from '../db/db.js'
import Player from '../models/Player.js'
import PlayerStatistics from '../models/PlayerStatistics.js'

const getPlayers = (req, res) => {
  connection.query('SELECT * FROM jugador;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error fetching players', error: err.message })
      return
    }
    res.json(Player.fromDbRows(rows))
  })
}

const getPlayerById = (req, res) => {
  const playerId = req.params.id
  connection.query(
    'SELECT * FROM jugador WHERE ID = ?;',
    [playerId],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching player', error: err.message })
        return
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Player not found' })
        return
      }
      res.json(Player.fromDbRow(rows[0]))
    }
  )
}

const getPlayerStatistics = (req, res) => {
  connection.query('SELECT * FROM estadisticas_jugadores;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({
          message: 'Error fetching player statistics',
          error: err.message,
        })
      return
    }
    res.json(PlayerStatistics.fromDbRows(rows))
  })
}

const getPlayerRanking = (req, res) => {
  connection.query('SELECT * FROM ranking_jugadores;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error fetching player ranking', error: err.message })
      return
    }
    res.json(Player.fromDbRows(rows))
  })
}

export { getPlayers, getPlayerById, getPlayerStatistics, getPlayerRanking }
