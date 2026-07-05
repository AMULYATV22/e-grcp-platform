import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import DashboardPage from "../pages/dashboard/DashboardPage";

describe("Dashboard", () => {
  test("renders dashboard", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();
  });
});