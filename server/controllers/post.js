const Recipe = require('../models/recipe');
const User = require('../models/user');
const Post = require('../models/post');

exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const { title, content, cocktail } = req.body;
    const recipe = await Recipe.findOne({ title: cocktail }).exec();
    const post = new Post({
      title,
      image: req.img,
      imageUrl: req.imgUrl,
      content,
      creator: user._id,
      cocktail: recipe._id,
    });
    await post.save();

    user.posts.push(post._id);
    await user.save();

    res.status(200).json({
      message: 'Create post successfully.',
      post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort('-createdAt')
      .populate('creator')
      .populate('cocktail')
      .populate('comments.user')
      .exec();

    res.status(200).json({ message: 'fetching posts successfully.', posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('creator')
      .populate('cocktail')
      .exec();
    if (!post) {
      const error = new Error('Find no post.');
      error.statusCode = 422;
      throw error;
    }
    res.status(200).json({ message: 'fetching posts successfully.', post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
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

    await post
      .updateOne({
        title: req.body.title,
        image: req.img || post.image,
        imageUrl: req.imgUrl || post.imageUrl,
        content: req.body.content,
      })
      .exec();

    res.status(200).json({ message: 'update posts successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.body._id).exec();
    const user = await User.findById(req.userId).exec();
    user.posts = user.posts.filter((id) => id.toString() !== req.body._id);
    await user.save();
    await User.updateMany({}, { $pull: { liked: { $in: req.body._id } } });
    res.status(200).json({ message: 'delete posts successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.likedPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const post = await Post.findById(req.body.id).exec();
    if (user.liked.some((el) => el.toString() === post._id.toString())) {
      user.liked = user.liked.filter(
        (el) => el.toString() !== post._id.toString()
      );
    } else {
      user.liked.push(post._id);
    }
    await user.save();

    res.status(200).json({ message: 'delete posts successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body._id).exec();
    const user = await User.findById(req.userId).exec();
    const commentData = { user: user._id, comment: req.body.comment };
    post.comments.push(commentData);
    await post.save();
    res.status(200).json({ message: 'add comment successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.post).exec();
    if (!post) {
      const error = new Error('Find no post.');
      error.statusCode = 422;
      throw error;
    }
    if (post.comments.id(req.body.comment).user.toString() !== req.userId) {
      const error = new Error('Authtication Error.');
      error.statusCode = 422;
      throw error;
    }
    await post.comments.id(req.body.comment).remove();
    await post.save();
    res.status(200).json({ message: 'remove comment successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
