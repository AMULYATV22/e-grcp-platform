import auditData from "../mocks/auditData";

export const getAudits = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(auditData);
    }, 1000);
  });
};

export const createAudit = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `AUD-${Math.floor(Math.random() * 90000) + 10000}`;
      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const time = now.toLocaleTimeString();
      const newAudit = {
        id: newId,
        activity: data.activity || "System Activity",
        user: data.user || "System",
        module: data.module || "General",
        date: date,
        time: time,
        status: data.status || "Completed",
        ipAddress: data.ipAddress || "192.168.1.0",
        details: data.details || "",
        timestamp: now.toISOString(),
      };
      resolve(newAudit);
    }, 850);
  });
};

export const updateAudit = async (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      const existing = auditData.find((a) => a.id === id) || {};
      const updatedAudit = {
        ...existing,
        ...data,
        id: id,
        timestamp: now.toISOString(),
      };
      resolve(updatedAudit);
    }, 800);
  });
};

export const deleteAudit = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, success: true });
    }, 850);
  });
};

export const exportAuditsToCSV = (audits) => {
  const headers = ["ID", "Activity", "User", "Module", "Date", "Time", "Status", "IP Address", "Details"];
  const rows = audits.map((a) => [a.id, a.activity, a.user, a.module, a.date, a.time, a.status, a.ipAddress, a.details]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  return csv;
};