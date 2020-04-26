import mongoose from 'mongoose';

export const User = mongoose.model('user', {
  email: String,
  username: String,
  password: String,
});
