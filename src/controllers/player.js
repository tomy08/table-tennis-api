import { Router } from 'express'
import {
  getPlayers,
  getPlayerById,
  getPlayerStatistics,
  getPlayerRanking,
} from '../controllers/playerController.js'

const router = Router()

router.get('/', getPlayers)
router.get('/stats', getPlayerStatistics)
router.get('/ranking', getPlayerRanking)
router.get('/:id', getPlayerById)

export default router
