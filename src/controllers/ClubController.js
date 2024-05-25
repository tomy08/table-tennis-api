import Club from '../models/Club.js'
import ClubScore from '../models/ClubScore.js'

class ClubController {
  static async getClubs(req, res) {
    try {
      const clubs = await Club.getAllClubs()
      res.json(clubs)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching clubs', error: err.message })
    }
  }

  static async getClubById(req, res) {
    try {
      const club = await Club.getClubById(req.params.id)
      if (!club) {
        res.status(404).json({ message: 'Club not found' })
      } else {
        res.json(club)
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching club', error: err.message })
    }
  }

  static async getClubRating(req, res) {
    try {
      const scores = await ClubScore.getAllClubScores()
      res.json(scores)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching club ratings', error: err.message })
    }
  }
}

export default ClubController
