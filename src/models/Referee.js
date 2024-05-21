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
}
