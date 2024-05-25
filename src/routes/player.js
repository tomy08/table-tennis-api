import { Router } from 'express'
import PlayerController from '../controllers/PlayerController.js'

const router = Router()

router.get('/', PlayerController.getPlayers)
router.get('/stats', PlayerController.getPlayerStatistics)
router.get('/ranking', PlayerController.getPlayerRanking)
router.get('/:id', PlayerController.getPlayerById)

export default router
