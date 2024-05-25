import connection from '../db.js'

export default class Player {
  constructor(row) {
    this.id = row.ID
    this.firstName = row.nombre
    this.lastName = row.apellido
    this.birthDate = row.fecha_nac
    this.rating = row.rating
    this.clubId = row.ID_club
  }

  static fromDbRow(row) {
    return new Player(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => Player.fromDbRow(row))
  }

  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM jugador;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(Player.fromDbRows(rows))
      })
    })
  }

  static getPlayerById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM jugador WHERE ID = ?;',
        [id],
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          if (rows.length === 0) {
            return resolve(null)
          }
          resolve(Player.fromDbRow(rows[0]))
        }
      )
    })
  }

  static getPlayerRanking() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ranking_jugadores;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(Player.fromDbRows(rows))
      })
    })
  }
}
