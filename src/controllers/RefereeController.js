import Referee from '../models/Referee.js'

class RefereeController {
  static async getReferees(req, res) {
    try {
      const referees = await Referee.getAllReferees()
      res.json(referees)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching referees', error: err.message })
    }
  }

  static async getRefereeById(req, res) {
    try {
      const referee = await Referee.getRefereeById(req.params.id)
      if (!referee) {
        res.status(404).json({ message: 'Referee not found' })
      } else {
        res.json(referee)
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching referee', error: err.message })
    }
  }
}

export default RefereeController
