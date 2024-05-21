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
}
