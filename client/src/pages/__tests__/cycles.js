import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import axios from "axios";

// Components
import App from "../../App";

describe("Dashboard", () => {
  describe("login and createa a cycle", () => {
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
      postAuthSuccess: {
        data: "asdofj1091jjksladf01asdf",
      },
      getAuth: {
        data: {
          _id: "0s9adf808sadfa0sdf8",
          name: "fake",
          email: "fake@mail.com",
          cyclesCompleted: 0,
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
      postCycle: {
        data: {
          cycle: {
            _id: "62607be5ab7521076f156d33",
            user: "624de9fa6926a5051d0cf9b0",
            completed: false,
            workoutsToDo: [],
            workoutsCompleted: [],
            maxes: {
              squat: 200,
              bench: 150,
              deadlift: 300,
              press: 100,
            },
          },
          msg: "A new cycle has been created",
        },
      },
      postWorkouts: {
        data: {
          workouts: ["1", "2", "3", "4", "5"],
        },
      },
      putCycle: {
        data: {
          _id: "62607be5ab7521076f156d33",
          user: "624de9fa6926a5051d0cf9b0",
          completed: false,
          workoutsToDo: ["1", "2", "3", "4", "5"],
          workoutsCompleted: [],
          maxes: {
            squat: 200,
            bench: 150,
            deadlift: 300,
            press: 100,
          },
        },
      },
    };
    beforeEach(() => jest.restoreAllMocks());
    afterEach(() => jest.restoreAllMocks());

    test("login and create a new cycle", async () => {
      jest.setTimeout(20000);
      // Mock loaduser, getCycles
      axios.get = jest.fn().mockImplementation((url) => {
        switch (url) {
          case "/api/auth":
            return Promise.resolve(res.getAuth);
          case "/api/cycles":
            return Promise.reject(res.getCycles);
        }
      });

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
      expect(getByText(/login/i)).toBeTruthy();
      expect(getByText(/register/i)).toBeTruthy();

      // Navigate to Login
      const leftClick = { button: 0 };
      fireEvent.click(getByText(/login/i), leftClick);

      // Redirected to dashboard
      await waitForElement(() => getByText(/logout/i));
      expect(window.location.href).toContain("http://localhost/dashboard");

      // See no cycles
      expect(getByText(/no cycles available/i)).toBeTruthy();

      // See add (+) button
      expect(getByTestId("create-cycle-button")).toBeTruthy();
      fireEvent.click(getByTestId("create-cycle-button"), leftClick);

      // See modal
      await waitForElement(() => getByText(/let\'s setup your maxes/i));
      expect(getByRole("button", { name: /setup/i })).toBeTruthy();

      fireEvent.click(getByRole("button", { name: /setup/i }), leftClick);

      // See form to enter maxes
      const maxes = {
        squat: 200,
        bench: 150,
        deadlift: 300,
        press: 100,
      };
      for (const exercise in maxes) {
        expect(
          getByRole("textbox", { name: new RegExp(exercise, "i") })
        ).toBeTruthy();
      }

      // Fill out maxes
      for (const exercise in maxes) {
        fireEvent.change(
          getByRole("textbox", { name: new RegExp(exercise, "i") }),
          { target: { value: maxes[exercise] } }
        );
      }
      fireEvent.click(getByRole("button", { name: "submit" }), leftClick);

      // See Summary
      await waitForElement(() => getByText(/your maxes for the next cycle/i));
      for (const exercise in maxes) {
        expect(getByText(new RegExp(exercise, "i"))).toBeTruthy();
        expect(getByText(new RegExp(maxes[exercise], "i"))).toBeTruthy();
      }

      // Click create
      axios.post = jest.fn().mockImplementation((url) => {
        switch (url) {
          case "/api/cycles":
            return Promise.resolve(res.postCycle);
          case `/api/workouts/${res.postCycle.data.cycle._id}`:
            return Promise.resolve(res.postWorkouts);
        }
      });
      axios.put = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(res.putCycle));
      fireEvent.click(getByRole("button", { name: "create" }), leftClick);

      // See new cycle is created
      await waitForElement(() => getByText(res.postCycle.data.msg));
      expect(getByRole("link", { name: "workout" })).toBeTruthy();
    });
  });
});
