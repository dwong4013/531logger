import reducer from "../cycles";
import {
  GET_CYCLES,
  NO_CYCLES,
  ADD_CYCLE,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CYCLE_ERROR,
} from "../../actions/types";
import "@testing-library/jest-dom/extend-expect";

describe("Cycles Reducer", () => {
  let actions = {
    getCycle: {
      type: GET_CYCLES,
      payload: [
        {
          _id: "624de9fa6926a5051d0cf9b0",
          user: "624de9fa6926a5051b1cf9b0",
          workoutsToDo: [],
        },
      ],
    },
    addCycle: {
      type: ADD_CYCLE,
      payload: {
        _id: "624de9fa6926a5051d0cf9b0",
        user: "624de9fa6926a5051b1cf9b0",
        workoutsToDo: [],
      },
    },
    updateCycle: {
      type: UPDATE_CYCLE,
      payload: {
        _id: "624de9fa6926a5051d0cf9b0",
        user: "624de9fa6926a5051b1cf9b0",
        workoutsToDo: ["a", "b", "c", "d"],
      },
    },
    noCycles: {
      type: NO_CYCLES,
    },
    cycleError: {
      type: CYCLE_ERROR,
    },
    deleteCycle: {
      type: DELETE_CYCLE,
      payload: "624de9fa6926a5051d0cf9b0",
    },
  };

  const initialState = {
    cycles: null,
    loading: true,
  };

  test("sets token and isAuthenticated values in state", () => {
    // No cycles to load
    let state = reducer(undefined, actions.noCycles);

    expect(state.cycles).toEqual(null);

    // Load cycles error
    state = reducer(state, actions.cycleError);

    expect(state.cycles).toEqual(null);

    // Add cycle action
    state = reducer(state, actions.addCycle);

    expect(state.cycles).toEqual([actions.addCycle.payload]);

    // Get cycles action
    state = reducer(state, actions.getCycle);

    expect(state.cycles).toEqual(actions.getCycle.payload);

    // Update cycle action
    state = reducer(state, actions.updateCycle);

    expect(state.cycles).toEqual([actions.updateCycle.payload]);

    // Delete cycle action
    state = reducer(state, actions.deleteCycle);

    expect(state.cycles).toEqual([]);
  });
});
