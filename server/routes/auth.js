const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  signup,
  login,
  getUser,
  updateUser,
  forgetPassword,
  setNewPassword,
} = require('../controllers/auth');
const { avatarUpload, avatarUpdate } = require('../middleware/image-upload');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('name').trim().not().isEmpty(),
  ],
  avatarUpload,
  signup
);

router.post('/login', login);

router.post(
  '/forget',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (!userDoc) {
          return Promise.reject('User with this Email could not be found.');
        }
      });
    })
    .normalizeEmail(),
  forgetPassword
);

router.post('/reset', setNewPassword);

router.put('/update', isAuth, avatarUpdate, updateUser);

router.get('/', isAuth, getUser);

module.exports = router;
