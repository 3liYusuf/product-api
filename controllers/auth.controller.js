export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    ); //(varname, its Ref)
    if (!user) {
      return next(CreateError(404, "User Not Found!"));
    }
    const { roles } = user;

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPassCorrect) {
      return next(CreateError(400, "Pass not correct!"));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login Success",
      token: token,
    });

    // const savedUser = await User.findById(user._id);
    // return next(CreateSuccess(200,"Login SuccessFully!", savedUser))
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
