import express from 'express';
import { createFavmovi, deleteFavmovi, getFavmovi } from '../controllers/favMovie.js';
import { isAuth } from '../middleware/auth.js';


const router = express.Router()

router.get('/',isAuth,getFavmovi)
router.post('/',isAuth,createFavmovi)
router.delete('/:id',isAuth,deleteFavmovi)

export default router