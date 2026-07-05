import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            px: 3,
          }}
        >
          <Paper elevation={6} sx={{ p: 5, textAlign: "center", borderRadius: 3, maxWidth: 560 }}>
            <Typography variant="h4" fontWeight="700" gutterBottom>
              Something went wrong
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              The application hit an unexpected error. Please refresh and try again.
            </Typography>
            <Button variant="contained" onClick={this.handleReload}>
              Reload Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;