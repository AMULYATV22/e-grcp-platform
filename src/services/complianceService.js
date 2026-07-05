import complianceData from "../mocks/complianceData";

export const getCompliance = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(complianceData);
    }, 1000);
  });
};

export const createComplianceRecord = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `CMP-${Math.floor(Math.random() * 90000) + 10000}`;
      const now = new Date().toISOString().split("T")[0];
      const newRecord = {
        id: newId,
        document: data.document || "New Compliance",
        department: data.department || "General",
        owner: data.owner || "Unassigned",
        status: data.status || "Pending",
        expiry: data.expiry || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        certificationDate: data.certificationDate || now,
        violations: data.violations || 0,
        description: data.description || "",
        createdAt: now,
        updatedAt: now,
      };
      resolve(newRecord);
    }, 850);
  });
};

export const updateComplianceRecord = async (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString().split("T")[0];
      const existing = complianceData.find((c) => c.id === id) || {};
      const updatedRecord = {
        ...existing,
        ...data,
        id: id,
        updatedAt: now,
      };
      resolve(updatedRecord);
    }, 800);
  });
};

export const deleteComplianceRecord = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, success: true });
    }, 850);
  });
};

export const exportComplianceToCSV = (records) => {
  const headers = ["ID", "Document", "Department", "Owner", "Status", "Expiry Date", "Certification Date", "Violations", "Description"];
  const rows = records.map((r) => [r.id, r.document, r.department, r.owner, r.status, r.expiry, r.certificationDate, r.violations, r.description]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  return csv;
};