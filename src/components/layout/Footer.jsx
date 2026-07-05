import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        py: 1.2,
        px: 3,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2026 e-GRCP Enterprise Platform · Governance · Risk · Compliance · Procurement
      </Typography>
    </Box>
  );
}