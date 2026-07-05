import { getProcurementRequests } from "../services/procurementService";

describe("Procurement Service", () => {
  test("returns procurement data", async () => {
    const data = await getProcurementRequests();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});