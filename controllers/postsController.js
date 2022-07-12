import mongoose from 'mongoose';
import PostsModel from '../models/postsModel.js';

export const getPosts = async (req, res) => {
  const posts = await PostsModel.find();
  try {
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostsModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const postBody = req.body;
  // console.log(postBody);
  const newPost = new PostsModel(postBody);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: 'Something went wrong at the backend' });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that Id');
  }

  const post = await PostsModel.findById(id);
  if (post) {
    const newCount = Number(post.likes) + 1;
    post.likes = newCount;
  } else {
    console.log('Post not found after search');
  }
  const updatedPost = await PostsModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const disLikePostItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that Id');
  }

  const post = await PostsModel.findById(id);
  if (post) {
    const newCount = Number(post.likes) - 1;
    post.likes = newCount;
  } else {
    console.log('Post not found after search');
  }
  const updatedPost = await PostsModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that Id');
  }

  const updatedPost = await PostsModel.findByIdAndUpdate(
    id,
    { ...post },
    { new: true }
  );

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const post = await PostsModel.findById(id);

  post.comments.push(comment);
  const updatedPost = await PostsModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const getPostsItemsBySearch = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const title = new RegExp(searchTerm, 'i'); //making it case insensitive
    const posts = await PostsModel.find({ title });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePostItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that Id');
  }

  const deletedPost = await PostsModel.findByIdAndRemove(id);

  if (deletedPost) {
    res.status(200).json({ message: 'Post deleted succesfully' });
  } else {
    console.log('POST NOT DELETED');
  }
};
