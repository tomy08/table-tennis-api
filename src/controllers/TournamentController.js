import Tournament from '../models/Tournament.js'

class TournamentController {
  static async getTournaments(req, res) {
    try {
      const tournaments = await Tournament.getAllTournaments()
      res.json(tournaments)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching tournaments', error: err.message })
    }
  }

  static async getTournamentById(req, res) {
    try {
      const tournament = await Tournament.getTournamentById(req.params.id)
      if (!tournament) {
        res.status(404).json({ message: 'Tournament not found' })
      } else {
        res.json(tournament)
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching tournament', error: err.message })
    }
  }
}

export default TournamentController
