import User from "../models/User.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the credentials are correct, return a success message
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
    next(error);
  }
};
