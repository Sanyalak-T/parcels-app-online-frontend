import api from "./api"; // Axios instance with withCredentials:true

export const signupUser = async ({ userName, email, password }) => {
  const response = await api.post("/auth/register", {
    userName,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// change or update password.
export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.post("/auth/users/update-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

// forgot password a user with reset password
export const resetPassword = async ({ email, newPassword }) => {
  try {
    const response = await api.post("/auth/reset-password", {
      email,
      password: newPassword,
    });
    return response.data;
  } catch (err) {
    console.error("Reset password failed:", err.response?.data || err.message);
    throw err; // ให้ caller เอาไปแสดงบน UI ต่อ
  }
};
