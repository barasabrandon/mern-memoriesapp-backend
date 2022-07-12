import mongoose from 'mongoose';

const postsSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    tags: [String],
    imageFile: String,
    likes: {
      type: Number,
      default: 0,
    },
    creator: String,
    comments: { type: [String], default: [] },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  }
  // { typeKey: '$type' }
);

const PostsModel = mongoose.model('PostsModel', postsSchema);

export default PostsModel;
