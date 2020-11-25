
//actions
const SHOW_ERROR = "SHOW_ERROR";
const HIDE_ERROR = "HIDE_ERROR";
const SET_USERNAME = "SET_USERNAME";
const SET_PASSWORD = "SET_PASSWORD";
const LOG_ON_USER = "LOG_ON_USER";

const initialState = {
  error: false,
  username: "",
  password: "",
  isLoggedIn: false,
};

//reducer
export default function componentExampleReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, error: true };
    case HIDE_ERROR:
      return { ...state, error: false };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case LOG_ON_USER:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}

//action creators
export function showError(payload: boolean) {
  if (payload) return { type: SHOW_ERROR };

  return { type: HIDE_ERROR };
}

export function setUsername(payload: string) {
  return { type: SET_USERNAME, payload };
}

export function setPassword(payload: string) {
  return { type: SET_PASSWORD, payload };
}

export function logOn() {
    return { type: LOG_ON_USER, payload: true };
}
