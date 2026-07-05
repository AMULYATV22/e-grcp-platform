import { sortRequests } from "../pages/procurement/ProcurementPage";

describe("sortRequests", () => {
  it("handles missing string values safely when sorting by dateCreated", () => {
    const requests = [
      { id: 1, dateCreated: undefined, department: "Finance" },
      { id: 2, dateCreated: "2024-01-02", department: "IT" },
      { id: 3, dateCreated: "2024-01-01", department: "HR" },
    ];

    const sorted = sortRequests(requests, {
      field: "dateCreated",
      order: "asc",
    });

    expect(sorted.map((request) => request.id)).toEqual([3, 2, 1]);
  });
});
