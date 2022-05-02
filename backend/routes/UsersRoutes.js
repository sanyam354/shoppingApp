const express = require("express");
const {
  authenticationController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
  adminUsers,
  adminUserDelete,
  changeAdmin,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Get the registration route
router.route("/").post(registerUser);
// Get Route for all Users
router.post("/login", authenticationController);

// creating a Private Route
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// for own account deletion
router.route("/delete").delete(protect, deleteUser);
//
router.route("/getAllAdminUsers").get(protect, adminUsers);
//delete account by an admin
router.route("/adminDeleteUser").post(protect, adminUserDelete);
// making someone else admin
router.route("/changeAdmin").post(protect, changeAdmin);
module.exports = router;
