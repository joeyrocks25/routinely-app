const API_URL = "http://localhost:3001/api";

export const addGoal = async (goalData) => {
    try {
      const token = await getToken();
  
      if (!token) {
        console.error("No token found.");
        return;
      }
  
      const response = await fetch(`${API_URL}/user/goal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No token found.");
      return;
    }

    const response = await fetch(`${API_URL}/user/goal/${goalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(goalData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating goal:", error);
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No token found.");
      return;
    }

    const response = await fetch(`${API_URL}/user/goal/${goalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
};

export const fetchUserData = async (token) => {
  try {
    const token = await getToken();
    
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getToken = async () => {
  try {
    console.log("Token is: ", localStorage.getItem("token"));
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Token not found:", error);
  }
};