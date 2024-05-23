import { Router } from 'express'
import { getTournaments, getTournamentById } from '../controllers/tournament.js'

const router = Router()

router.get('/', getTournaments)
router.get('/:id', getTournamentById)

export default router
