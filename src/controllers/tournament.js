import connection from '../db.js'
import Tournament from '../models/Tournament.js'

const getTournaments = (req, res) => {
  connection.query('SELECT * FROM torneo;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error fetching tournaments', error: err.message })
      return
    }
    res.json(Tournament.fromDbRows(rows))
  })
}

const getTournamentById = (req, res) => {
  const tournamentId = req.params.id
  connection.query(
    'SELECT * FROM torneo WHERE ID = ?;',
    [tournamentId],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching tournament', error: err.message })
        return
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Tournament not found' })
        return
      }
      res.json(Tournament.fromDbRow(rows[0]))
    }
  )
}

export { getTournaments, getTournamentById }
