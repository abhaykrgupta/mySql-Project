"use client";

import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/authSlice";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user data from Redux store
  const [loading, setLoading] = useState(true); // Added loading state to prevent unnecessary redirects

  // Check localStorage for token and user data on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If there's token and user in localStorage and they're not already in Redux, set them
    if (token && storedUser && !user) {
      dispatch(setToken(token)); // Set the token in Redux
      dispatch(setUser(JSON.parse(storedUser))); // Set the user in Redux
    } else if (!token || !storedUser) {
      // If no token or user in localStorage, clear Redux state (logout)
      dispatch(setToken(null));
      dispatch(setUser(null));
    }

    // Set loading to false after the above check
    setLoading(false);
  }, [user, dispatch]);

  // Check if the user is authenticated and if the data is loaded
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Logout function
  const logout = () => {
    // 1. Clear the user and token from Redux state
    dispatch(setUser(null));
    dispatch(setToken(null));

    // 2. Clear any data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 3. Redirect to the login page
    router.push("/login");
  };

  // If still loading, show a loading spinner or message
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard 🎉
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Hello,👋
        </Typography>
        <Typography variant="body1">
          You are now logged in and can access protected content.
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary">
            Explore Features
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={logout} // Trigger the logout function
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
