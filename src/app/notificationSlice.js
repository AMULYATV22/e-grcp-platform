import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../services/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      return await getNotifications();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch notifications"
      );
    }
  }
);

const normalizeNotification = (notification) => ({
  ...notification,
  category: notification.category || notification.type || "General",
  read:
    notification.read !== undefined
      ? notification.read
      : notification.status === "Read",
  status:
    notification.status ||
    (notification.read ? "Read" : "Unread"),
});

const calculateUnreadCount = (notifications) =>
  notifications.filter((item) => !item.read).length;

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,

  filters: {
    search: "",
    category: "all",
    priority: "",
    status: "all",
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

      state.unreadCount = calculateUnreadCount(
        state.notifications
      );
    },

    markRead: (state, action) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload
      );

      if (notification) {
        notification.read = true;
        notification.status = "Read";
      }

      state.unreadCount = calculateUnreadCount(
        state.notifications
      );
    },

    markUnread: (state, action) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload
      );

      if (notification) {
        notification.read = false;
        notification.status = "Unread";
      }

      state.unreadCount = calculateUnreadCount(
        state.notifications
      );
    },

    markAllRead: (state) => {
      state.notifications.forEach((item) => {
        item.read = true;
        item.status = "Read";
      });

      state.unreadCount = 0;
    },

    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );

      state.unreadCount = calculateUnreadCount(
        state.notifications
      );
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

        state.notifications = action.payload.map(
          normalizeNotification
        );

        state.unreadCount = calculateUnreadCount(
          state.notifications
        );
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load notifications";
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

export const selectAllNotifications = (state) =>
  state.notifications.notifications;

export const selectNotificationLoading = (state) =>
  state.notifications.loading;

export const selectNotificationError = (state) =>
  state.notifications.error;

export const selectUnreadCount = (state) =>
  state.notifications.unreadCount;

export const selectReadCount = (state) =>
  state.notifications.notifications.filter(
    (item) => item.read
  ).length;

export const selectHighPriorityCount = (state) =>
  state.notifications.notifications.filter(
    (item) => item.priority === "High"
  ).length;

export const selectTotalNotifications = (state) =>
  state.notifications.notifications.length;



export const selectNotificationFilters = (state) =>
  state.notifications.filters;