import connection from '../db.js'

export default class Tournament {
  constructor(row) {
    this.id = row.ID
    this.name = row.nombre_torneo
    this.date = row.fecha
    this.category = row.categoria
    this.location = row.localidad
  }

  static fromDbRow(row) {
    return new Tournament(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => Tournament.fromDbRow(row))
  }

  static getAllTournaments() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM torneo;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(Tournament.fromDbRows(rows))
      })
    })
  }

  static getTournamentById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM torneo WHERE ID = ?;',
        [id],
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          if (rows.length === 0) {
            return resolve(null)
          }
          resolve(Tournament.fromDbRow(rows[0]))
        }
      )
    })
  }
}
