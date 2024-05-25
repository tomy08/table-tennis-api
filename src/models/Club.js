import connection from '../db.js'

export default class Club {
  constructor(row) {
    this.id = row.ID
    this.name = row.nombre
    this.location = row.ubicacion
    this.creationDate = row.fecha_creacion
  }

  static fromDbRow(row) {
    return new Club(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => Club.fromDbRow(row))
  }

  static getAllClubs() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM club;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(Club.fromDbRows(rows))
      })
    })
  }

  static getClubById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM club WHERE ID = ?;',
        [id],
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          if (rows.length === 0) {
            return resolve(null)
          }
          resolve(Club.fromDbRow(rows[0]))
        }
      )
    })
  }
}
