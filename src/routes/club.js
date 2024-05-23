import { Router } from 'express'
import { getClubs, getClubById, getClubRating } from '../controllers/club.js'

const router = Router()

router.get('/', getClubs)
router.get('/:id', getClubById)
router.get('/rating', getClubRating)

export default router
