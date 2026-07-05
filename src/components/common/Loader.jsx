import {
  Box,
  CircularProgress,
  Typography,
  Container,
} from "@mui/material";

export default function Loader({ label = "Loading..." }) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        {label && (
          <Typography variant="body1" color="text.secondary">
            {label}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
