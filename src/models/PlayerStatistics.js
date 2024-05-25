import connection from '../db.js'

export default class PlayerStatistics {
  constructor(row) {
    this.playerId = row.jugador_ID
    this.playerFirstName = row.nombre_jugador
    this.playerLastName = row.apellido_jugador
    this.rating = row.rating
    this.matchesPlayed = row.partidos_jugados
    this.finalsPlayed = row.finales_jugadas
    this.finalsWon = row.finales_ganadas
    this.matchesWon = row.partidos_ganados
  }

  static fromDbRow(row) {
    return new PlayerStatistics(row)
  }

  static fromDbRows(rows) {
    return rows.map((row) => PlayerStatistics.fromDbRow(row))
  }

  static getAllPlayerStatistics() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM estadisticas_jugadores;', (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(PlayerStatistics.fromDbRows(rows))
      })
    })
  }
}
