import express from 'express';
import { getPosts,createPost,updatePost,deletePost,likeCount,createComment } from '../controllers/post.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router()

router.get('/', getPosts)
router.post('/', isAuth, createPost)
router.patch('/:id', isAuth, updatePost)
router.delete('/:id', isAuth, deletePost)
router.patch('/:id/likeCount', isAuth, likeCount)
router.patch('/comment/:id',isAuth,createComment)

export default router