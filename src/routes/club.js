import { Router } from 'express'

import Club from '../models/Club.js'
import connection from '../db.js'

const router = Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM club;', (err, rows) => {
    if (err) throw err
    res.json(Club.fromDbRows(rows))
  })
})

router.get('/:id', (req, res) => {
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

router.get('/rating', (req, res) => {
  connection.query(
    'SELECT * FROM puntaje_maximo_club ORDER BY puntaje_maximo DESC;',
    (err, rows) => {
      if (err) throw err
      res.json(ClubScore.fromDbRows(rows))
    }
  )
})

export default router
