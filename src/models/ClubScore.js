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
}
