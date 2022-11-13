const { Schema, default: mongoose } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cocktail: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
    comments: [
      {
        type: new Schema(
          {
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            comment: String,
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
