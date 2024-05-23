import { Router } from 'express'
import { getMatches, getMatchById } from '../controllers/match.js'

const router = Router()

router.get('/', getMatches)
router.get('/:id', getMatchById)

export default router
