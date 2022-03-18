import User from '../models/User'

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    //compare if the username already exist
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The user already exists" });
    //compare if the email already exist
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { checkDuplicateUsernameOrEmail };
