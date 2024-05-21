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
}
