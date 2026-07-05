import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../services/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getNotifications();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch notifications"
      );
    }
  }
);

const normalizeNotification = (notification) => ({
  ...notification,
  category: notification.type || notification.category || "General",
  read: notification.status === "Read",
});

const calculateUnreadCount = (notifications) =>
  notifications.filter((notification) => !notification.read).length;

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
  filters: {
    search: "",
    status: "all",
    priority: "",
    category: "all",
    fromDate: "",
    toDate: "",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = normalizeNotification(action.payload);
      state.notifications.unshift(notification);
      state.unreadCount = calculateUnreadCount(state.notifications);
    },
    markRead: (state, action) => {
      const notification = state.notifications.find((item) => item.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        notification.status = "Read";
        state.unreadCount = calculateUnreadCount(state.notifications);
      }
    },
    markUnread: (state, action) => {
      const notification = state.notifications.find((item) => item.id === action.payload);
      if (notification && notification.read) {
        notification.read = false;
        notification.status = "Unread";
        state.unreadCount = calculateUnreadCount(state.notifications);
      }
    },
    markAllRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
        notification.status = "Read";
      });
      state.unreadCount = 0;
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
      state.unreadCount = calculateUnreadCount(state.notifications);
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (state.notifications.length === 0) {
          state.notifications = action.payload;
          state.unreadCount = action.payload.filter((n) => !n.read).length;
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load notifications";
      });
  },
});

export const {
  addNotification,
  markRead,
  markUnread,
  markAllRead,
  deleteNotification,
  setFilters,
} = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectAllNotifications = (state) => state.notifications?.notifications ?? [];
export const selectNotificationLoading = (state) => state.notifications?.loading ?? false;
export const selectNotificationError = (state) => state.notifications?.error ?? null;
export const selectUnreadCount = (state) => state.notifications?.unreadCount ?? 0;
export const selectReadCount = (state) =>
  state.notifications?.notifications?.filter((notification) => notification.read).length ?? 0;
export const selectHighPriorityCount = (state) =>
  state.notifications?.notifications?.filter(
    (notification) => notification.priority === "High"
  ).length ?? 0;
export const selectTotalNotifications = (state) => state.notifications?.notifications?.length ?? 0;
export const selectNotificationFilters = (state) => {
  const filters = state.notifications?.filters ?? {};
  return {
    ...initialState.filters,
    ...filters,
  };
};
