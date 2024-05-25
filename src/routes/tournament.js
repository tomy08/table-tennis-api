import { Router } from 'express'
import TournamentController from '../controllers/TournamentController.js'

const router = Router()

router.get('/', TournamentController.getTournaments)
router.get('/:id', TournamentController.getTournamentById)

export default router
