import connection from '../db.js'

export default class ClubScore {
  constructor(row) {
    this.clubId = row.club_ID
    this.clubName = row.nombre_club
    this.maxScore = row.puntaje_maximo
    this.playerCount = row.cantidad_jugadores
  }

  static fromDbRow(row) {
    return new ClubScore(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => ClubScore.fromDbRow(row))
  }

  static getAllClubScores() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM puntaje_maximo_club ORDER BY puntaje_maximo DESC;',
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          resolve(ClubScore.fromDbRows(rows))
        }
      )
    })
  }
}
