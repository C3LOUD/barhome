const User = require('../models/user');
const Post = require('../models/post');
const cloudinary = require('../util/cloudinary');

module.exports.avatarUpload = async (req, res, next) => {
  try {
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

    const imgRes = await cloudinary.uploader.upload(imgStr, {
      folder: 'user_avatar',
    });
    req.publicId = imgRes.public_id;
    req.url = imgRes.url;
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.avatarUpdate = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (user.avatarUrl === req.body.avatar) return next();
    if (req.body.avatar.length / 1024 > 2048) {
      const currentSize = req.body.avatar.length / 1048576;
      const error = new Error(
        `File size over limit(2 MB). Current: ${currentSize}`
      );
      error.statusCode = 401;
      throw error;
    }
    const imgStr = req.body.avatar;
    const imgRes = await cloudinary.uploader.upload(imgStr, {
      folder: 'user_avatar',
    });
    req.img = imgRes.public_id;
    req.imgUrl = imgRes.url;
    await cloudinary.uploader.destroy(user.avatar);
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.postImgUpload = async (req, res, next) => {
  try {
    if (req.body.image.length / 1024 > 2048) {
      const currentSize = req.body.image.length / 1048576;
      const error = new Error(
        `File size over limit(2 MB). Current: ${currentSize}`
      );
      error.statusCode = 401;
      throw error;
    }
    const imgStr = req.body.image;
    const imgRes = await cloudinary.uploader.upload(imgStr, {
      folder: 'post_image',
    });
    req.img = imgRes.public_id;
    req.imgUrl = imgRes.url;
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.postImgUpdate = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body._id).exec();
    if (!post) {
      const error = new Error('Find no post.');
      error.statusCode = 422;
      throw error;
    }
    if (post.imageUrl === req.body.image) return next();

    if (req.body.image.length / 1024 > 2048) {
      const currentSize = req.body.image.length / 1048576;
      const error = new Error(
        `File size over limit(2 MB). Current: ${currentSize}`
      );
      error.statusCode = 401;
      throw error;
    }
    const imgStr = req.body.image;
    const imgRes = await cloudinary.uploader.upload(imgStr, {
      folder: 'post_image',
    });
    req.img = imgRes.public_id;
    req.imgUrl = imgRes.url;
    await cloudinary.uploader.destroy(post.image);
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};

module.exports.postImgDelete = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body._id).exec();
    if (!post) {
      const error = new Error('Find no post.');
      error.statusCode = 422;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId) {
      const error = new Error('Authentication error.');
      error.statusCode = 422;
      throw error;
    }

    await cloudinary.uploader.destroy(post.image);
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
};
