import connection from '../db.js'

export default class Match {
  constructor(row) {
    this.id = row.match_id
    this.refereeId = row.referee_id
    this.player1Id = row.player1_id
    this.player1Name = row.player1_name
    this.player1Rating = row.player1_rating
    this.player2Id = row.player2_id
    this.player2Name = row.player2_name
    this.player2Rating = row.player2_rating
    this.tournamentId = row.tournament_id
    this.stage = row.stage
    this.sets = []
  }

  addSet(set) {
    this.sets.push(set)
  }

  static fromDbRow(row) {
    const match = new Match(row)
    match.addSet({
      setNumber: row.set_number,
      player1GamesWon: row.player1_games_won,
      player2GamesWon: row.player2_games_won,
    })
    return match
  }

  static fromDbRows(rows) {
    const matchesMap = new Map()
    rows.forEach((row) => {
      const matchId = row.match_id
      if (!matchesMap.has(matchId)) {
        const match = Match.fromDbRow(row)
        matchesMap.set(matchId, match)
      } else {
        const match = matchesMap.get(matchId)
        match.addSet({
          setNumber: row.set_number,
          player1GamesWon: row.player1_games_won,
          player2GamesWon: row.player2_games_won,
        })
      }
    })
    return Array.from(matchesMap.values())
  }

  static getAllMatches() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM MatchView ORDER BY match_id ASC;',
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          resolve(Match.fromDbRows(rows))
        }
      )
    })
  }

  static getMatchById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM MatchView WHERE match_id = ?;',
        [id],
        (err, rows) => {
          if (err) {
            return reject(err)
          }
          if (rows.length === 0) {
            return resolve(null)
          }
          resolve(Match.fromDbRow(rows[0]))
        }
      )
    })
  }
}
