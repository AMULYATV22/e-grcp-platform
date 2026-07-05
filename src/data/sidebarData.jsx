import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GavelIcon from "@mui/icons-material/Gavel";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const sidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Procurement",
    path: "/procurement",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Vendors",
    path: "/vendors",
    icon: <PeopleIcon />,
  },
  {
    title: "Risk",
    path: "/risk",
    icon: <WarningAmberIcon />,
  },
  {
    title: "Compliance",
    path: "/compliance",
    icon: <GavelIcon />,
  },
  {
    title: "Audit",
    path: "/audit",
    icon: <FactCheckIcon />,
  },
  {
    title: "Approval Workbench",
    path: "/approvals",
    icon: <TaskAltIcon />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <BarChartIcon />,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <NotificationsIcon />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

export default sidebarData;