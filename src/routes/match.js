import { Router } from 'express'
import MatchController from '../controllers/MatchController.js'

const router = Router()

router.get('/', MatchController.getMatches)
router.get('/:id', MatchController.getMatchById)

export default router
