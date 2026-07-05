import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import LoginPage from "../pages/auth/LoginPage";

describe("Login Page", () => {
  test("renders login heading", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/e-GRCP/i)).toBeInTheDocument();
  });

  test("renders email field", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();
  });

  test("renders password field", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });
});