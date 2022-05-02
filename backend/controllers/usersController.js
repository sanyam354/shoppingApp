const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const router = require("../routes/UsersRoutes");
const generateToken = require("../utils/tokenGeneration");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExisted = await User.findOne({ email });
  //If User already there
  if (userExisted) {
    return res.status(400).json({ error: "Email Already Existed" });
    // throw new Error('User Already Existed')
  }
  // Create new user
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send("User Not Found");
  }
});

// login
const authenticationController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ error: "Invalid Login credentials" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).send({ error: "User Not Found" });
  }
});

// Get Updated User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).send({ error: "Error while Updating user Profile" });
  }
});
// delete user By user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);
  res.json(user);
});

// getting users for the admin
const adminUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(401).send({ error: "Users Not Found" });
  }
});

// delete User By an Admin
const adminUserDelete = asyncHandler(async (req, res) => {
  const userid = req.body.userId;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted Successfully");
  } catch (error) {
    res.status(404).send({ error: "Error While deleting User" });
  }
});

// making admin
const changeAdmin = asyncHandler(async (req, res) => {
  const userid = req.body.userId;
  try {
    const userAdmin = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { isAdmin: false }
    );
    const user = await User.findByIdAndUpdate(
      { _id: userid },
      { isAdmin: true }
    );
    await userAdmin.save();
    await user.save();
    res.status(200).send("Admin Change Successfully");
  } catch (error) {
    res.status(404).send({ error: "Admin Change Error" });
  }
});

module.exports = {
  authenticationController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
  adminUsers,
  adminUserDelete,
  changeAdmin,
};
