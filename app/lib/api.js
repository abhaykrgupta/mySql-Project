import axios from "axios";
import error from "next/error";

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      
      console.log("API Response:", response.data); // Log the response to see its structure
  
      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error("Login failed, token or user missing in response");
      }
  
      return { token, user }; // Returns token and user if available
    } catch (err) {
      console.error("Error logging in:", err);
      throw err; // Re-throw the error so it can be handled in the component
    }
  };
  
  // Function to handle user signup
export const signupUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/signup", { email, password });

    console.log("Signup API Response:", response.data); // Log to see response structure

    const { user } = response.data;
    if (!user) {
      throw new Error("Signup failed, user missing in response");
    }

    return user; // Return user object after successful signup
  } catch (err) {
    console.error("Error signing up:", err);
    throw err; // Re-throw error for component-level handling
  }
};