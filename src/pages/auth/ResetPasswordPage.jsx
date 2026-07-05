import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

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

import LockResetIcon from "@mui/icons-material/LockReset";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    if (!token) {
      return;
    }

    setSubmitted(true);
  };

  if (!token) {
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
            <Stack spacing={3} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "error.main",
                  width: 60,
                  height: 60,
                }}
              >
                <LockResetIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
              >
                Invalid Reset Link
              </Typography>

              <Typography
                align="center"
                color="text.secondary"
              >
                The password reset link is invalid or has
                expired. Please request a new reset link.
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/forgot-password")}
                >
                  Request New Link
                </Button>
              </Box>

              <Typography align="center">
                <Link to="/login">Back to Login</Link>
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (submitted) {
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
            <Stack spacing={3} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "success.main",
                  width: 60,
                  height: 60,
                }}
              >
                <CheckCircleIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
              >
                Password Reset Successful
              </Typography>

              <Typography
                align="center"
                color="text.secondary"
              >
                Your password has been reset successfully.
                You can now log in with your new password.
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Container>
    );
  }

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
              <LockResetIcon />
            </Avatar>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
            >
              Reset Password
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
            >
              Enter your new password below. Make sure it's
              strong and unique.
            </Typography>

            <Alert severity="info">
              Password must contain at least 8 characters,
              including uppercase, lowercase, and numbers.
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Reset Password
                </Button>

                <Typography align="center">
                  <Link to="/login">Back to Login</Link>
                </Typography>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}