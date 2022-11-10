const User = require('../models/user');
const cloudinary = require('../util/cloudinary');

module.exports.avatarUpload = async (req, res, next) => {
  if (!req.body.avatar) return next();
  if (req.body.avatar.length / 1024 > 2048) {
    const currentSize = req.body.avatar.length / 1048576;
    const error = new Error(
      `File size over limit(2 MB). Current: ${currentSize}`
    );
    error.statusCode = 401;
    throw error;
  }
  const imgStr = req.body.avatar;

  try {
    const imgRes = await cloudinary.uploader.upload(imgStr, {
      folder: 'user_avatar',
    });
    req.publicId = imgRes.public_id;
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.avatarRemove = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Find no user');
      error.statusCode = 401;
      throw error;
    }
    await cloudinary.uploader.destroy(user.avatar);
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.avatarFetch = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Find no user');
      error.statusCode = 401;
      throw error;
    }
    if (!user.avatar) next();
    const imgRes = await cloudinary.api.resource(user.avatar);
    req.imgUrl = imgRes.url;
    req.user = user;
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};
