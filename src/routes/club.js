import { Router } from 'express'
import ClubController from '../controllers/ClubController.js'

const router = Router()

router.get('/', ClubController.getClubs)
router.get('/rating', ClubController.getClubRating)
router.get('/:id', ClubController.getClubById)

export default router
