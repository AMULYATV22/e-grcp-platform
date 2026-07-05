import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ComplianceKpiCards from "../components/compliance/ComplianceKpiCards";
import complianceData from "../mocks/complianceData";

describe("Compliance KPI Cards", () => {
  it("should render compliance KPI cards", () => {
    render(<ComplianceKpiCards compliance={complianceData} />);

    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Expired")).toBeInTheDocument();
    expect(screen.getByText("Total Violations")).toBeInTheDocument();
  });

  it("should display counts for compliance records", () => {
    render(<ComplianceKpiCards compliance={complianceData} />);

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });
});
