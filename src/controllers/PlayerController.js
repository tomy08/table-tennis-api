import Player from '../models/Player.js'
import PlayerStatistics from '../models/PlayerStatistics.js'

class PlayerController {
  static async getPlayers(req, res) {
    try {
      const players = await Player.getAllPlayers()
      res.json(players)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching players', error: err.message })
    }
  }

  static async getPlayerById(req, res) {
    try {
      const player = await Player.getPlayerById(req.params.id)
      if (!player) {
        res.status(404).json({ message: 'Player not found' })
      } else {
        res.json(player)
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching player', error: err.message })
    }
  }

  static async getPlayerStatistics(req, res) {
    try {
      const stats = await PlayerStatistics.getAllPlayerStatistics()
      res.json(stats)
    } catch (err) {
      res
        .status(500)
        .json({
          message: 'Error fetching player statistics',
          error: err.message,
        })
    }
  }

  static async getPlayerRanking(req, res) {
    try {
      const ranking = await Player.getPlayerRanking()
      res.json(ranking)
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error fetching player ranking', error: err.message })
    }
  }
}

export default PlayerController
