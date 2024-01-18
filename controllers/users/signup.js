// controllers/users/signup.js
import Joi from 'joi';
import User from '#models/users.js';
import bcrypt from 'bcrypt';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

async function signup(req, res) {
  try {
    // Validate request body
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter', // Default subscription
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
}

export { signup };