"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToken, setUser } from "../redux/authSlice";
import { loginUser } from "../lib/api";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

// Yup validation schema
const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { token, user } = await loginUser(data.email, data.password);

      console.log("Token:", token);
      console.log("User:", user);

      dispatch(setToken(token));
      dispatch(setUser(user));

      // Wait for the Redux state to update and then redirect
        router.push("/dashboard"); // Redirect on success
      // Redirect on success
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5">Sign in</Typography>

        {error && <Typography color="error">{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
