import riskData from "../mocks/riskData";

export const getRisks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(riskData);
    }, 1000);
  });
};

export const createRisk = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRisk = {
        id: `RISK-${Date.now()}`,
        ...data,
        createdAt: new Date(),
        status: "Open",
      };
      resolve(newRisk);
    }, 900);
  });
};

export const updateRisk = async (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const risk = riskData.find((r) => r.id === id);
      if (risk) {
        const updated = { ...risk, ...data, updatedAt: new Date() };
        resolve(updated);
      }
    }, 900);
  });
};

export const deleteRisk = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 800);
  });
};

export const mitigateRisk = async (id, mitigationPlan) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const risk = riskData.find((r) => r.id === id);
      if (risk) {
        const mitigated = {
          ...risk,
          mitigation: mitigationPlan,
          status: "In Progress",
          updatedAt: new Date(),
        };
        resolve(mitigated);
      }
    }, 900);
  });
};

export const exportRisksToCSV = (risks) => {
  const headers = ["ID", "Description", "Level", "Category", "Status"];
  const rows = risks.map((r) => [
    r.id,
    r.description,
    r.level,
    r.category,
    r.status,
  ]);
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  return csv;
};