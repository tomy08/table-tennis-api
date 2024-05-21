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
}
