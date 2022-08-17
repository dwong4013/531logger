import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import axios from "axios";

// Components
import App from "../../App";

describe("Landing", () => {
  describe("register a new account", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const renderApp = () => {
      let utils = render(<App />);
      return { ...utils, history };
    };

    const res = {
      postUsersSuccess: {
        data: "asdofj1091jjksladf01asdf",
      },
      getAuth: {
        data: {
          _id: "0s9adf808sadfa0sdf8",
          name: "fake",
          email: "fake@mail.com",
        },
      },
      authError: {
        response: {
          status: 500,
          data: {
            error: {
              msg: "Server Error",
            },
          },
        },
      },
      getCycles: {
        response: {
          data: {
            status: 400,
            error: {
              msg: "No cycles found",
            },
          },
        },
      },
    };

    beforeEach(() => jest.restoreAllMocks());
    afterEach(() => jest.restoreAllMocks());

    test("register and redirect to dashboard", async () => {
      axios.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(res.authError));

      // Render Landing and Register Routes, start at Landing
      const {
        getByText,
        getByTestId,
        getByPlaceholderText,
        getAllByPlaceholderText,
        getByRole,
        history,
      } = renderApp();

      // See buttons to login or register
      expect(getByRole("link", { name: /login/i })).toBeTruthy();
      expect(getByRole("link", { name: /register/i })).toBeTruthy();

      // Navigate to Register
      const leftClick = { button: 0 };
      fireEvent.click(getByRole("link", { name: /register/i }), leftClick);

      // Arrived at Register page
      expect(window.location.href).toContain("http://localhost/register");
      expect(getByText(/new account/i)).toBeTruthy();
      // See registration form
      expect(getByPlaceholderText(/name/i)).toBeTruthy();
      expect(getByPlaceholderText(/email/i)).toBeTruthy();
      expect(getAllByPlaceholderText(/password/i)).toBeTruthy();
      expect(getByRole("button", { name: /submit/i })).toBeTruthy();

      // Fill form with not matching passwords
      fireEvent.change(getByPlaceholderText(/name/i), {
        target: { value: "fake" },
      });
      fireEvent.change(getByPlaceholderText(/email/i), {
        target: { value: "fake@mail.com" },
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "test123" },
      });
      fireEvent.change(getByPlaceholderText("Re-enter Password"), {
        target: { value: "different" },
      });

      // Click sign up
      fireEvent.click(getByRole("button", { name: /submit/i }), leftClick);

      // Password error alert appears
      await waitForElement(() => getByText(/passwords do not match/i));

      // Fill form with matching password
      fireEvent.change(getByPlaceholderText("Re-enter Password"), {
        target: { value: "test123" },
      });

      // Mock loaduser, getCycles
      axios.get = jest.fn().mockImplementation((url) => {
        switch (url) {
          case "/api/auth":
            return Promise.resolve(res.getAuth);
          case "/api/cycles":
            return Promise.reject(res.getCycles);
        }
      });
      axios.post = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(res.postUsersSuccess));
      // Click sign up
      fireEvent.click(getByRole("button", { name: /submit/i }), leftClick);

      // Redirected to dashboard
      await waitForElement(() => getByText(/logout/i));
      expect(window.location.href).toContain("http://localhost/dashboard");
    });
  });
});
