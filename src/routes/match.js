import { Router } from 'express'

import connection from '../db.js'
import Match from '../models/Match.js'

const router = Router()

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM MatchView ORDER BY match_id ASC;',
    (err, rows) => {
      if (err) throw err
      res.json(Match.fromDbRows(rows))
    }
  )
})

router.get('/:id', (req, res) => {
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

export default router
