const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const {
  postImgUpload,
  postImgUpdate,
  postImgDelete,
} = require('../middleware/image-upload');
const {
  createPost,
  fetchAllPosts,
  fetchPost,
  editPost,
  deletePost,
  likedPost,
  addComment,
  removeComment,
} = require('../controllers/post');

router.post('/create', isAuth, postImgUpload, createPost);

router.post('/comment', isAuth, addComment);

router.delete('/comment', isAuth, removeComment);

router.put('/liked', isAuth, likedPost);

router.get('/:postId', isAuth, fetchPost);

router.put('/', isAuth, postImgUpdate, editPost);

router.delete('/', isAuth, postImgDelete, deletePost);

router.get('/', isAuth, fetchAllPosts);

module.exports = router;
