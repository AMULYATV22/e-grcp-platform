import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login, setLoading, setError } from "../../app/authSlice";
import { loginUser } from "../../services/authService";

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoginError(null);
      dispatch(setLoading(true));

      // Call login service
      const response = await loginUser(
        data.email,
        data.password
      );

      // Dispatch login action
      dispatch(
        login({
          name: response.name,
          email: response.email,
          role: response.role,
          token: response.token,
        })
      );

      dispatch(setLoading(false));
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.message ||
        "Login failed. Please try again.";
      setLoginError(errorMessage);
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 5,
            width: "100%",
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                mx: "auto",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
            >
              e-GRCP
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
            >
              Enterprise Governance Platform
            </Typography>

            {loginError && (
              <Alert severity="error">{loginError}</Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isSubmitting}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "LOGGING IN..." : "LOGIN"}
                </Button>

                <Typography align="center">
                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>
                </Typography>
              </Stack>
            </form>

            <Typography
              align="center"
              variant="body2"
              color="text.secondary"
            >
              Demo credentials: any email and password
              (6+ characters)
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}