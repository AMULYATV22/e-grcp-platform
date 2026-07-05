import procurementReducer, {
  addRequest,
} from "../app/procurementSlice";

describe("Procurement Slice", () => {
  test("adds procurement request", () => {
    const initialState = {
      requests: [],
      loading: false,
      error: null,
    };

    const newState = procurementReducer(
      initialState,
      addRequest({
        id: "REQ-999",
        department: "IT",
        item: "Laptop",
        requestedBy: "Admin",
        amount: 1000,
        status: "Pending",
      })
    );

    expect(newState.requests.length).toBe(1);
  });
});