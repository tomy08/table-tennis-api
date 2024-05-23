import connection from '../db.js'
import Club from '../models/Club.js'
import ClubScore from '../models/ClubScore.js'

const getClubs = (req, res) => {
  connection.query('SELECT * FROM club;', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error fetching clubs', error: err.message })
      return
    }
    res.json(Club.fromDbRows(rows))
  })
}

const getClubById = (req, res) => {
  const clubId = req.params.id
  connection.query(
    'SELECT * FROM club WHERE ID = ?;',
    [clubId],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching club', error: err.message })
        return
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Club not found' })
        return
      }
      res.json(Club.fromDbRow(rows[0]))
    }
  )
}

const getClubRating = (req, res) => {
  connection.query(
    'SELECT * FROM puntaje_maximo_club ORDER BY puntaje_maximo DESC;',
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error fetching club ratings', error: err.message })
        return
      }
      res.json(ClubScore.fromDbRows(rows))
    }
  )
}

export { getClubs, getClubById, getClubRating }
