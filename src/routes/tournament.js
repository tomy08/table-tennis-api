import { Router } from 'express'

import connection from '../db.js'

import Tournament from '../models/Tournament.js'

const router = Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM torneo;', (err, rows) => {
    if (err) throw err
    res.json(Tournament.fromDbRows(rows))
  })
})

router.get('/:id', (req, res) => {
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

export default router
