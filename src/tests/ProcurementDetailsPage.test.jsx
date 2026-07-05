import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ProcurementDetailsPage from "../pages/procurement/ProcurementDetailsPage";
import procurementReducer from "../app/procurementSlice";

// Mock useParams and useNavigate
vi.mock("react-router-dom", () => ({
  useParams: () => ({ requestId: "REQ-1001" }),
  useNavigate: () => vi.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("Procurement Details Page", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        procurement: procurementReducer,
      },
    });
  });

  it("should render procurement details", () => {
    render(
      <Provider store={store}>
        <ProcurementDetailsPage />
      </Provider>
    );

    expect(screen.getByText(/Procurement Request/i)).toBeInTheDocument();
  });

  it("should display tabs", () => {
    render(
      <Provider store={store}>
        <ProcurementDetailsPage />
      </Provider>
    );

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Attachments")).toBeInTheDocument();
    expect(screen.getByText("Approval History")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });
});
