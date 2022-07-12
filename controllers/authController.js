import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AuthModel from '../models/authModel.js';

export const createUser = async (req, res) => {
  const { firstName, secondName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password missmatch' });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await AuthModel.create({
      name: `${firstName} ${secondName}`,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'memories_test',
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const existingUser = await AuthModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.status(404).json({ message: 'Wrong Password' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'memories_test',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error.message);
  }
};
