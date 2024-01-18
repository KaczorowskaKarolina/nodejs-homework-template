// controllers/users/login.js
import Joi from 'joi';
import User from '#models/users.js';
import bcrypt from 'bcrypt';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

async function login(req, res) {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Generate authentication token
    const token = await user.generateAuthToken();

    // Respond with success
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
}

export { login };
