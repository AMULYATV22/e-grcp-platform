import reportsData from "../mocks/reportsData";

export const getReports = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reportsData);
    }, 1000);
  });
};

export const createReport = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString().split("T")[0];
      resolve({
        id: `REP-${Date.now()}`,
        report: data.report || "New Report",
        type: data.type || "General",
        generatedBy: data.generatedBy || "System",
        date: now,
        status: data.status || "Draft",
        createdAt: now,
        updatedAt: now,
        content: data.content || "",
      });
    }, 850);
  });
};

export const updateReport = async (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString().split("T")[0];
      resolve({ id, ...data, updatedAt: now });
    }, 800);
  });
};

export const deleteReport = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, success: true }), 850);
  });
};

export const saveReport = async (id, name) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, report: name, status: "Generated" }), 900);
  });
};