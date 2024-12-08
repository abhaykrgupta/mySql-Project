"use client";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { signupUser } from "../lib/api"; // Import the signup function
import { useRouter } from "next/navigation";

// schema for yup validation schema
const schema = Yup.object({
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),
});

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // pass the validation schema to useform
  });

  const [errorMessage, setErrorMessage] = useState(""); // state to manage error messages
  const [successMessage, setSuccessMessage] = useState(""); // state to manage success messages

  const onSubmit = async (data) => {
    try {
      // Send the signup data to the backend API
      const user = await signupUser(data.email, data.password);

      if (user) {
        // Handle success
        setSuccessMessage("Signup successful! You can now log in.");
        setErrorMessage(""); // Clear any previous error

        // Trigger the redirection after a short delay
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(error.response?.data?.error || "Internal server error");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Full viewport height
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Centering vertically
          minHeight: "60vh", // Full viewport height
          padding: 3, // Adds padding inside the box
          border: "1px solid #ccc", // Optional border for the box
          borderRadius: 2, // Optional rounded corners
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {errorMessage && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Typography>
        )}

        {successMessage && (
          <Typography
            color="primary"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            {successMessage}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email")} // Register input with validation rules
            error={!!errors.email} // If error exists, mark input as invalid
            helperText={errors.email?.message} // Display error message
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")} // Register input with validation rules
            error={!!errors.password} // If error exists, mark input as invalid
            helperText={errors.password?.message} // Display error message
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
