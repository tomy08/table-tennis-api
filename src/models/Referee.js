import connection from '../db.js'

export default class Referee {
  constructor(row) {
    this.id = row.ID
    this.firstName = row.nombre
    this.lastName = row.apellido
    this.birthDate = row.fecha_nac
  }

  static fromDbRow(row) {
    return new Referee(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => Referee.fromDbRow(row))
  }

  static getAllReferees() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM arbitro;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(Referee.fromDbRows(rows))
      })
    })
  }

  static getRefereeById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM arbitro WHERE ID = ?;',
        [id],
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          if (rows.length === 0) {
            return resolve(null)
          }
          resolve(Referee.fromDbRow(rows[0]))
        }
      )
    })
  }
}
