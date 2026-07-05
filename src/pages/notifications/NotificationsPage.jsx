import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addNotification,
  fetchNotifications,
  markRead,
  markUnread,
  markAllRead,
  deleteNotification,
  setFilters,
  selectAllNotifications,
  selectNotificationLoading,
  selectNotificationError,
  selectUnreadCount,
  selectReadCount,
  selectHighPriorityCount,
  selectTotalNotifications,
  selectNotificationFilters,
} from "../../app/notificationSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  Stack,
  Button,
  Chip,
  TextField,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import NotificationDialog from "../../components/notifications/NotificationDialog";
import NotificationTable from "../../components/notifications/NotificationTable";

const categories = ["all", "Procurement", "Vendor", "Risk", "Compliance", "Audit", "Reports"];
const priorities = ["", "Critical", "High", "Medium", "Low"];
const statuses = ["all", "Unread", "Read"];

const escapeCsvValue = (value) => {
  const stringValue = value == null ? "" : String(value);
  const escapedValue = stringValue.replace(/\"/g, '\"\"');
  return `"${escapedValue}"`;
};

const createCsvContent = (notifications) => {
  const headers = [
    "Notification ID",
    "Title",
    "Message",
    "Priority",
    "Category",
    "Status",
    "Created Date",
  ];

  const rows = notifications.map((notification) => [
    notification.id,
    notification.title,
    notification.message,
    notification.priority,
    notification.category || notification.type || "General",
    notification.status,
    notification.date,
  ]);

  return [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ].join("\n");
};

const downloadCsv = (filename, content) => {
  const blob = new Blob(["\uFEFF", content], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function NotificationsPage() {
  const dispatch = useDispatch();

  const notifications = useSelector(selectAllNotifications);
  const loading = useSelector(selectNotificationLoading);
  const error = useSelector(selectNotificationError);
  const unreadCount = useSelector(selectUnreadCount);
  const readCount = useSelector(selectReadCount);
  const highPriorityCount = useSelector(selectHighPriorityCount);
  const totalNotifications = useSelector(selectTotalNotifications);
  const filters = useSelector(selectNotificationFilters);

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const filteredNotifications = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
    const toDate = filters.toDate ? new Date(filters.toDate) : null;

    return notifications.filter((notification) => {
      const category = notification.category || notification.type || "General";
      const searchTarget = [
        notification.title,
        notification.message,
        notification.priority,
        category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchTerm === "" || searchTarget.includes(searchTerm);
      const matchesStatus = filters.status === "all" || notification.status === filters.status;
      const matchesPriority = filters.priority === "" || notification.priority === filters.priority;
      const matchesCategory = filters.category === "all" || category === filters.category;

      const notificationDate = new Date(notification.date);
      const matchesFrom = !fromDate || notificationDate >= fromDate;
      const matchesTo = !toDate || notificationDate <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [notifications, filters]);

  const updateFilter = useCallback(
    (update) => {
      dispatch(setFilters(update));
    },
    [dispatch]
  );

  const handleAddNotification = useCallback(
    (notification) => {
      dispatch(addNotification(notification));
      setOpenDialog(false);
      setSnackbarMessage("Notification added successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const handleMarkRead = useCallback(
    (id) => {
      dispatch(markRead(id));
      setSnackbarMessage("Notification marked as read");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const handleMarkUnread = useCallback(
    (id) => {
      dispatch(markUnread(id));
      setSnackbarMessage("Notification marked as unread");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const handleMarkAllRead = useCallback(() => {
    dispatch(markAllRead());
    setSnackbarMessage("All notifications marked as read");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  }, [dispatch]);

  const handleDeleteRequest = useCallback((notification) => {
    setDeleteTarget(notification);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    dispatch(deleteNotification(deleteTarget.id));
    setDeleteDialogOpen(false);
    setSnackbarMessage("Notification deleted");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setDeleteTarget(null);
  }, [deleteTarget, dispatch]);

  const handleExportCSV = useCallback(() => {
    const csvContent = createCsvContent(filteredNotifications);
    downloadCsv("notifications.csv", csvContent);
  }, [filteredNotifications]);

  const handleRowClick = useCallback((notification) => {
    setDetailTarget(notification);
  }, []);

  const closeDetails = useCallback(() => {
    setDetailTarget(null);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <CircularProgress />
          <Typography variant="h6">Loading Notifications...</Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Notification Center
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Notifications", value: totalNotifications },
          { label: "Unread", value: unreadCount },
          { label: "Read", value: readCount },
          { label: "High Priority", value: highPriorityCount },
        ].map((card) => (
          <Paper key={card.label} sx={{ flex: 1, p: 2, minWidth: 180 }} elevation={2}>
            <Typography variant="subtitle2" color="text.secondary">
              {card.label}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {card.value}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={2} sx={{ alignItems: "flex-start" }}>
          <TextField
            fullWidth
            size="small"
            label="Search Notifications"
            placeholder="Search by title, message, category or priority"
            value={filters.search}
            onChange={(e) => updateFilter({ search: e.target.value })}
          />

          <TextField
            fullWidth
            size="small"
            select
            label="Category"
            value={filters.category}
            onChange={(e) => updateFilter({ category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            size="small"
            select
            label="Priority"
            value={filters.priority}
            onChange={(e) => updateFilter({ priority: e.target.value })}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority === "" ? "All Priorities" : priority}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            size="small"
            select
            label="Status"
            value={filters.status}
            onChange={(e) => updateFilter({ status: e.target.value })}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status === "all" ? "All Status" : status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="From Date"
            slotProps={{ label: { shrink: true } }}
            value={filters.fromDate}
            onChange={(e) => updateFilter({ fromDate: e.target.value })}
          />

          <TextField
            fullWidth
            size="small"
            type="date"
            label="To Date"
            slotProps={{ label: { shrink: true } }}
            value={filters.toDate}
            onChange={(e) => updateFilter({ toDate: e.target.value })}
          />

          <Box sx={{ flex: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenDialog(true)}>
              New Notification
            </Button>
            <Button variant="contained" color="success" onClick={handleMarkAllRead}>
              Mark All Read
            </Button>
          </Box>
        </Stack>
      </Paper>

      <NotificationTable
        rows={filteredNotifications}
        onRowClick={handleRowClick}
        onMarkRead={handleMarkRead}
        onMarkUnread={handleMarkUnread}
        onDelete={handleDeleteRequest}
      />

      <NotificationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddNotification}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Notification</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this notification?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(detailTarget)} onClose={closeDetails} fullWidth maxWidth="sm">
        <DialogTitle>Notification Details</DialogTitle>
        <DialogContent dividers>
          {detailTarget ? (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                ID
              </Typography>
              <Typography>{detailTarget.id}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography>{detailTarget.title}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Message
              </Typography>
              <Typography>{detailTarget.message}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Category
              </Typography>
              <Typography>{detailTarget.category || "General"}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Priority
              </Typography>
              <Typography>{detailTarget.priority}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography>{detailTarget.status}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Created Date
              </Typography>
              <Typography>{detailTarget.date}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Activity Timeline
              </Typography>
              <Typography>
                {detailTarget.read
                  ? "Marked read as part of notification workflow."
                  : "Awaiting user review."}
              </Typography>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
