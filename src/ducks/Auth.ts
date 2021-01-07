//actions
export const UPDATE_USER = "UPDATE_USER";

const initialState = {
  username: "",
  accessToken: "",
  isLoggedIn: false,
};

//reducer
export default function AuthReducer(
  state = initialState,
  action: { type: string, payload?: any }
) {
  const { type, payload } = action;
  let newState = state;
  
  switch (type) {
    case UPDATE_USER:
      newState = { 
        ...state,
        isLoggedIn: payload.isLoggedIn,
        username: payload.username,
        accessToken: payload.accessToken,
      };
      break;
  }

  return newState;
}

//action creators
export function logOn(username: string, accessToken: string) {
  return { type: UPDATE_USER, payload: {
    isLoggedIn: true,
    username,
    accessToken,
  } };
}
export function logOff() {
  return { type: UPDATE_USER, payload: {
    isLoggedIn: false,
    username: "",
    accessToken: "",
  } };
}