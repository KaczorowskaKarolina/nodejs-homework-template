// models/users.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar'; // Dodaj nowy import

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // Dodaj generowanie URL-a avatara przy użyciu gravatar
  if (!user.avatarURL) {
    const avatarURL = gravatar.url(user.email, { s: '200', r: 'pg', d: 'mm' }); // Konfiguracja avatara
    user.avatarURL = avatarURL;
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
