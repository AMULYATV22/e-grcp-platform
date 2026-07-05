import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSessionExpired } from "../../app/authSlice";

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";

export default function SessionExpiredPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginAgain = () => {
    dispatch(clearSessionExpired());
    navigate("/login");
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
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "error.main",
                width: 60,
                height: 60,
              }}
            >
              <ErrorIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
            >
              Session Expired
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
            >
              Your session has expired due to inactivity
              or unauthorized access. Please log in again
              to continue.
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
              variant="body2"
            >
              For security reasons, we automatically log
              out inactive sessions after 30 minutes.
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLoginAgain}
              >
                Login Again
              </Button>
            </Box>

            <Typography align="center" variant="body2">
              Contact support if you need assistance.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
