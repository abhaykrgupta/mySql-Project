"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Container, Typography, Box } from "@mui/material";

export default function Home() {
  // State to simulate the authentication status (replace this with your actual auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // You can replace this with actual authentication check (e.g., from localStorage, Redux, or an API call)
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography component="h1" variant="h3" align="center">
          Welcome to Auth Dashboard
        </Typography>
        <Typography variant="body1" align="center">
          This is a simple application demonstrating authentication and protected routes.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/signup" // Link to the signup page
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              href="/dashboard"
              variant="outlined"
              color="secondary"
            >
              Go to Dashboard
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
