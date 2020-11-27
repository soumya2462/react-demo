import expect from "expect";
import componentExampleReducer, {
  SHOW_ERROR,
  HIDE_ERROR,
  SET_USERNAME,
  SET_PASSWORD,
  LOG_ON_USER,
} from "./componentExample";

const initialState = {
  error: false,
  username: "",
  password: "",
  isLoggedIn: false,
};

const reducer = componentExampleReducer;

describe("Component example reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_ERROR", () => {
    const action = {
      type: SHOW_ERROR,
    };

    const expectedState = {
      error: true,
      username: "",
      password: "",
      isLoggedIn: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle HIDE_ERROR", () => {
    const action = {
      type: HIDE_ERROR,
    };

    const initialStateWithError = {
      error: true,
      username: "",
      password: "",
      isLoggedIn: false,
    };

    const expectedState = {
      error: false,
      username: "",
      password: "",
      isLoggedIn: false,
    };

    expect(reducer(initialStateWithError, action)).toEqual(expectedState);
  });

  it("should handle SET_USERNAME", () => {
    const action = {
      type: SET_USERNAME,
      payload: "username",
    };

    const expectedState = {
      error: false,
      username: "username",
      password: "",
      isLoggedIn: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_PASSWORD", () => {
    const action = {
      type: SET_PASSWORD,
      payload: "password",
    };

    const expectedState = {
      error: false,
      username: "",
      password: "password",
      isLoggedIn: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOG_ON_USER", () => {
    const action = {
      type: LOG_ON_USER,
      payload: true,
    };

    const expectedState = {
      error: false,
      username: "",
      password: "",
      isLoggedIn: true,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
