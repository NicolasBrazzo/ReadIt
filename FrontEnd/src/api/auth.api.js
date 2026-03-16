import api from "./client";

export const login = (data) =>
  api.post("/login", data);

export const logout = () =>
  api.post("/logout");

export const getMe = () =>
  api.get("/me");

export const updateProfile = (data) =>
  api.put("/profile", data);

export const changePassword = (data) =>
  api.patch("/profile/password", data);
