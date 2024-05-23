import { Router } from 'express'
import { getClubs, getClubById, getClubRating } from '../controllers/club.js'

const router = Router()

router.get('/', getClubs)
router.get('/rating', getClubRating)
router.get('/:id', getClubById)

export default router
