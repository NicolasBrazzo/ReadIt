const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);
router.put("/profile", auth, updateProfile);
router.patch("/profile/password", auth, changePassword);

module.exports = router;
