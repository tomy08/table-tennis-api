import connection from '../db.js'
import Match from '../models/Match.js'

const getMatches = (req, res) => {
  connection.query(
    'SELECT * FROM MatchView ORDER BY match_id ASC;',
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching matches', error: err.message })
        return
      }
      res.json(Match.fromDbRows(rows))
    }
  )
}

const getMatchById = (req, res) => {
  const matchId = req.params.id
  connection.query(
    'SELECT * FROM MatchView WHERE match_id = ?;',
    [matchId],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching match', error: err.message })
        return
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Match not found' })
        return
      }
      res.json(Match.fromDbRow(rows[0]))
    }
  )
}

export { getMatches, getMatchById }
