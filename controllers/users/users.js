// controllers/users/users.js

import User from '#models/users.js';

async function verifyUser(req, res) {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ustawienie pól verify i verificationToken
    user.verify = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: 'Verification successful' });
  } catch (err) {
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
}

export { verifyUser };
