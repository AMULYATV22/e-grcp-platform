
/**
 * Login user with credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User data with authentication token
 */
export const loginUser = async (email) => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Administrator",
        email: email,
        role: "Administrator",
        token: "mock_jwt_token_" + Date.now(),
        isAuthenticated: true,
      });
    }, 1000);
  });
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise} New user data
 */
export const registerUser = async (userData) => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random(),
        ...userData,
        token: "mock_jwt_token_" + Date.now(),
        isAuthenticated: true,
      });
    }, 1000);
  });
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise} Reset link sent confirmation
 */
export const forgotPassword = async (email) => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Reset link sent to email",
        email: email,
      });
    }, 1000);
  });
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise} Password reset confirmation
 */
export const resetPassword = async () => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Password reset successfully",
      });
    }, 1000);
  });
};

/**
 * Logout user
 * @returns {Promise} Logout confirmation
 */
export const logoutUser = async () => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Logged out successfully",
      });
    }, 500);
  });
};

/**
 * Refresh authentication token
 * @returns {Promise} New token
 */
export const refreshToken = async () => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "mock_jwt_token_" + Date.now(),
        expiresIn: 3600,
      });
    }, 500);
  });
};

/**
 * Get current user profile
 * @returns {Promise} User profile data
 */
export const getCurrentUser = async () => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Administrator",
        email: "admin@grcp.com",
        role: "Administrator",
        avatar: "https://i.pravatar.cc/150?img=1",
      });
    }, 500);
  });
};