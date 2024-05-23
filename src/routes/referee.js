import { Router } from 'express'
import { getReferees, getRefereeById } from '../controllers/referee.js'

const router = Router()

router.get('/', getReferees)
router.get('/:id', getRefereeById)

export default router
