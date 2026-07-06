import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import {
  selectCurrentUser,
  logout,
} from "../../app/authSlice";

import {
  selectDarkMode,
  toggleTheme,
} from "../../app/uiSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const themeMode = useAppSelector(selectDarkMode);

  const [search, setSearch] = useState("");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Procurement", path: "/procurement" },
    { name: "Vendors", path: "/vendors" },
    { name: "Risk", path: "/risk" },
    { name: "Compliance", path: "/compliance" },
    { name: "Audit", path: "/audit" },
    { name: "Approval Workbench", path: "/approvals" },
    { name: "Reports", path: "/reports" },
    { name: "Notifications", path: "/notifications" },
    { name: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (event) => {
    if (event.key !== "Enter") return;

    const page = menuItems.find((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (page) {
      navigate(page.path);
      setSearch("");
    } else {
      alert("No matching page found.");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            width: {
              xs: 170,
              md: 240,
            },
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          e-GRCP Platform
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            px: 2,
          }}
        >
          <TextField
            placeholder="Search modules..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            sx={{
              width: {
                xs: "100%",
                md: 400,
              },
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Tooltip title="Toggle Theme">
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
            >
              {themeMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={() => navigate("/notifications")}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            {user?.avatar || user?.name?.charAt(0) || "A"}
          </Avatar>

          <Typography
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {user?.name || "Administrator"}
          </Typography>

          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}