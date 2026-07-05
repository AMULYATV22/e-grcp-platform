import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar, { SIDEBAR_WIDTH } from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 3 }, py: 3, pb: 5 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}