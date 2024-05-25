import Match from '../models/Match.js'

export default class MatchController {
  static async getMatches(req, res) {
    try {
      const matches = await Match.getAllMatches()
      res.json(matches)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching matches', error: err.message })
    }
  }

  static async getMatchById(req, res) {
    try {
      const match = await Match.getMatchById(req.params.id)
      if (!match) {
        res.status(404).json({ message: 'Match not found' })
      } else {
        res.json(match)
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching match', error: err.message })
    }
  }
}
