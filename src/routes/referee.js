import { Router } from 'express'

import connection from '../db.js'

import Referee from '../models/Referee.js'

const router = Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM arbitro;', (err, rows) => {
    if (err) throw err
    res.json(Referee.fromDbRows(rows))
  })
})

router.get('/:id', (req, res) => {
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

export default router
