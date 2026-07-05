import procurementData from "../mocks/procurementData";

/**
 * Get all procurement requests
 * @returns {Promise} Array of procurement requests
 */
export const getProcurementRequests = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(procurementData);
    }, 1000);
  });
};

/**
 * Create new procurement request
 * @param {Object} requestData - Request data
 * @returns {Promise} Created request
 */
export const createProcurementRequest = async (requestData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest = {
        id: `REQ-${Date.now()}`,
        dateCreated: new Date().toISOString().split("T")[0],
        status: "Pending",
        approvalHistory: [],
        comments: [],
        attachments: [],
        auditLogs: [
          {
            action: "Created",
            user: requestData.requestedBy,
            date: new Date().toISOString().split("T")[0],
          },
        ],
        ...requestData,
      };
      procurementData.unshift(newRequest);
      resolve(newRequest);
    }, 1000);
  });
};

/**
 * Update procurement request
 * @param {string} id - Request ID
 * @param {Object} data - Updated data
 * @returns {Promise} Updated request
 */
export const updateProcurementRequest = async (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = procurementData.find((r) => r.id === id);
      if (request) {
        Object.assign(request, data);
        resolve(request);
      } else {
        reject(new Error("Request not found"));
      }
    }, 800);
  });
};

/**
 * Delete procurement request
 * @param {string} id - Request ID
 * @returns {Promise} Deleted request ID
 */
export const deleteProcurementRequest = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = procurementData.findIndex((r) => r.id === id);
      if (index >= 0) {
        procurementData.splice(index, 1);
        resolve(id);
      } else {
        reject(new Error("Request not found"));
      }
    }, 800);
  });
};

/**
 * Cancel procurement request
 * @param {string} id - Request ID
 * @returns {Promise} Cancelled request
 */
export const cancelProcurementRequest = async (id) => {
  return updateProcurementRequest(id, { status: "Cancelled" });
};

/**
 * Export procurement requests to CSV
 * @param {Array} requests - Requests to export
 * @returns {Blob} CSV file blob
 */
export const exportProcurementToCSV = (requests) => {
  const headers = [
    "Request ID",
    "Department",
    "Item",
    "Requested By",
    "Status",
    "Amount",
    "Date Created",
    "Vendor",
  ];
  const rows = requests.map((r) => [
    r.id,
    r.department,
    r.item,
    r.requestedBy,
    r.status,
    r.amount,
    r.dateCreated,
    r.vendor,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  return new Blob([csv], { type: "text/csv" });
};