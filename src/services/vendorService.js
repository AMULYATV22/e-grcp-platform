import vendorData from "../mocks/vendorData";

/**
 * Get all vendors
 * @returns {Promise} Array of vendors
 */
export const getVendors = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vendorData);
    }, 1000);
  });
};

/**
 * Get vendor by ID
 * @param {string} id - Vendor ID
 * @returns {Promise} Vendor data
 */
export const getVendorById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vendor = vendorData.find((v) => v.id === id);
      if (vendor) {
        resolve(vendor);
      } else {
        reject(new Error("Vendor not found"));
      }
    }, 500);
  });
};

/**
 * Create new vendor
 * @param {Object} vendorData - Vendor data
 * @returns {Promise} Created vendor
 */
export const createVendor = async (vendorInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVendor = {
        id: `VND-${Date.now()}`,
        status: "Active",
        riskScore: 5,
        performanceRating: 3.5,
        registrationDate: new Date().toISOString().split("T")[0],
        documents: [],
        history: [],
        ...vendorInfo,
      };
      vendorData.unshift(newVendor);
      resolve(newVendor);
    }, 1000);
  });
};

/**
 * Update vendor
 * @param {string} id - Vendor ID
 * @param {Object} data - Updated data
 * @returns {Promise} Updated vendor
 */
export const updateVendor = async (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vendor = vendorData.find((v) => v.id === id);
      if (vendor) {
        Object.assign(vendor, data);
        vendor.history = vendor.history || [];
        vendor.history.unshift({
          date: new Date().toISOString().split("T")[0],
          action: "Updated",
          details: "Vendor information updated",
        });
        resolve(vendor);
      } else {
        reject(new Error("Vendor not found"));
      }
    }, 800);
  });
};

/**
 * Delete vendor
 * @param {string} id - Vendor ID
 * @returns {Promise} Deleted vendor ID
 */
export const deleteVendor = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = vendorData.findIndex((v) => v.id === id);
      if (index >= 0) {
        vendorData.splice(index, 1);
        resolve(id);
      } else {
        reject(new Error("Vendor not found"));
      }
    }, 800);
  });
};

/**
 * Rate vendor
 * @param {string} id - Vendor ID
 * @param {number} rating - Rating (1-5)
 * @returns {Promise} Updated vendor
 */
export const rateVendor = async (id, rating) => {
  return updateVendor(id, { performanceRating: rating });
};

/**
 * Update vendor risk score
 * @param {string} id - Vendor ID
 * @param {number} riskScore - Risk score (1-10)
 * @returns {Promise} Updated vendor
 */
export const updateVendorRiskScore = async (id, riskScore) => {
  return updateVendor(id, {
    riskScore,
    risk:
      riskScore <= 3 ? "Low" : riskScore <= 6 ? "Medium" : "High",
  });
};

/**
 * Export vendors to CSV
 * @param {Array} vendors - Vendors to export
 * @returns {Blob} CSV file blob
 */
export const exportVendorsToCSV = (vendors) => {
  const headers = [
    "Vendor ID",
    "Name",
    "Category",
    "Contact",
    "Email",
    "Risk",
    "Status",
    "Rating",
    "Registration Date",
  ];
  const rows = vendors.map((v) => [
    v.id,
    v.name,
    v.category,
    v.contact,
    v.email,
    v.risk,
    v.status,
    v.performanceRating,
    v.registrationDate,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  return new Blob([csv], { type: "text/csv" });
};