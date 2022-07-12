import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AuthModel = mongoose.model('AuthModel', authSchema);

export default AuthModel;
