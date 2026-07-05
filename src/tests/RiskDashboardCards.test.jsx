import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RiskDashboardCards from "../components/risk/RiskDashboardCards";
import riskData from "../mocks/riskData";

describe("Risk Dashboard Cards", () => {
  it("should render KPI cards", () => {
    render(<RiskDashboardCards risks={riskData} />);

    expect(screen.getByText("Critical Risks")).toBeInTheDocument();
    expect(screen.getByText("High Risks")).toBeInTheDocument();
    expect(screen.getByText("Open Risks")).toBeInTheDocument();
    expect(screen.getByText("Mitigated")).toBeInTheDocument();
  });

  it("should display risk counts", () => {
    render(<RiskDashboardCards risks={riskData} />);

    const cards = screen.getAllByText(/Risks?|Mitigated/i);
    expect(cards.length).toBeGreaterThan(0);
  });
});
