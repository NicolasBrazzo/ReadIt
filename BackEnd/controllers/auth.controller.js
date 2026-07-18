const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, findUserById, updateUser, updatePassword } = require("../models/user.model");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
  COOKIE_OPTIONS,
} = require("../config/jwt");

const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;'`~]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return errors;
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        error: "Password requirements not met",
        details: passwordErrors,
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await createUser(name, email, hashedPassword);
    const token = jwt.sign({ name, id: result.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ name: user.name, id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

const getMe = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) return res.json({ authenticated: false });
    return res.json({
      authenticated: true,
      user: { id: user.id, name: user.name, email: user.email, avatar_url: user.avatar_url || null },
    });
  } catch {
    return res.json({ authenticated: false });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Logout failed" });
  }
};

// PUT /profile - Aggiorna nome e/o avatar
const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { name, avatar_url } = req.body;

    if (!name && avatar_url === undefined) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const fields = {};
    if (name) fields.name = name.trim();
    if (avatar_url !== undefined) fields.avatar_url = avatar_url || null;

    const updatedUser = await updateUser(req.user.id, fields);

    return res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Failed to update profile" });
  }
};

// PATCH /profile/password - Cambia password
const changePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        error: "Password requirements not met",
        details: passwordErrors,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await updatePassword(req.user.id, hashedPassword);

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ error: "Failed to change password" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
};
