import express from 'express';

import {
  createPost,
  getPosts,
  likePost,
  updatePost,
  getPostById,
  commentPost,
  getPostsItemsBySearch,
  disLikePostItem,
  deletePostItem,
} from '../controllers/postsController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/searchPosts', getPostsItemsBySearch);
router.get('/:id', getPostById);
router.patch('/likePost/:id', likePost);
router.patch('/disLikePostItem/:id', disLikePostItem);
router.patch('/editPost/:id', updatePost);
router.post('/commentPost/:id', commentPost);
router.delete('/deletePost/:id', deletePostItem);

export default router;
