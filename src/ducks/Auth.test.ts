import expect from "expect";
import AuthReducer, {
  UPDATE_USER,
} from "./Auth";

const initialState = {
    username: "",
    accessToken: "",
    isLoggedIn: false,
  };

const reducer = AuthReducer;

describe("Auth reducer -", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle logOn UPDATE_USER", () => {
    const action = {
      type: UPDATE_USER,
      payload: {
          isLoggedIn: true,
          username: "test_username",
          accessToken: "test_accessToken",
      },
    };

    const expectedState = {
      username: "test_username",
      accessToken: "test_accessToken",
      isLoggedIn: true,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle logOff UPDATE_USER", () => {
    const initialStateLoggedIn = {
        username: "test_username",
        accessToken: "test_accessToken",
        isLoggedIn: true,
      };

    const action = {
      type: UPDATE_USER,
      payload: {
          isLoggedIn: false,
          username: "",
          accessToken: "",
      },
    };

    const expectedState = {
      username: "",
      accessToken: "",
      isLoggedIn: false,
    };

    expect(reducer(initialStateLoggedIn, action)).toEqual(expectedState);
  });
});
