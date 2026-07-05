import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

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
                <MailOutlinedIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
              >
                Check Your Email
              </Typography>

              <Typography
                align="center"
                color="text.secondary"
              >
                We've sent password reset instructions to{" "}
                <strong>{getValues("email")}</strong>
              </Typography>

              <Typography
                align="center"
                color="text.secondary"
                variant="body2"
              >
                Please check your email and click the link
                to reset your password. If you don't see
                the email, check your spam folder.
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              </Box>

              <Typography align="center" variant="body2">
                <Link to="/login" style={{ color: "inherit" }}>
                  Remember your password?
                </Link>
              </Typography>
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
              <MailOutlinedIcon />
            </Avatar>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
            >
              Forgot Password
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
            >
              Enter your email address and we'll send you
              a link to reset your password.
            </Typography>

            <Alert severity="info">
              Password reset link will expire in 24 hours.
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  label="Email Address"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Send Reset Link
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