import { Router } from 'express'
import RefereeController from '../controllers/RefereeController.js'

const router = Router()

router.get('/', RefereeController.getReferees)
router.get('/:id', RefereeController.getRefereeById)

export default router
