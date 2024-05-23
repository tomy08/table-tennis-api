import connection from '../db.js'
import Referee from '../models/Referee.js'

const getReferees = (req, res) => {
  connection.query('SELECT * FROM arbitro;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error fetching referees', error: err.message })
      return
    }
    res.json(Referee.fromDbRows(rows))
  })
}

const getRefereeById = (req, res) => {
  const refereeId = req.params.id
  connection.query(
    'SELECT * FROM arbitro WHERE ID = ?;',
    [refereeId],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching referee', error: err.message })
        return
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Referee not found' })
        return
      }
      res.json(Referee.fromDbRow(rows[0]))
    }
  )
}

export { getReferees, getRefereeById }
