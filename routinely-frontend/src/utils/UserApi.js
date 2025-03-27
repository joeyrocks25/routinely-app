const API_URL = "http://localhost:3001/api";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (data.token) {
      setToken(data.token);
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
    }

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const setToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Token not found:", error);
  }
};
