import notificationsData from "../mocks/notificationsData";

export const getNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notificationsData);
    }, 1000);
  });
};

export const markAsRead = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, read: true, status: "Read" }), 800);
  });
};

export const deleteNotification = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, success: true }), 850);
  });
};