//actions
export const LOG_ON_USER = "LOG_ON_USER";

const initialState = {
  username: "",
  accessToken: "",
  isLoggedIn: false,
};

//reducer
export default function LoginReducer(
  state = initialState,
  action: { type: string, payload?: any }
) {
  const { type, payload } = action;
  
  switch (type) {
    case LOG_ON_USER:
      return { 
        ...state,
        isLoggedIn: payload.isLoggedIn,
        username: payload.username,
        accessToken: payload.accessToken,
      };
    default:
      return state;
  }
}

//action creators
export function logOn(username: string, accessToken: string) {
  return { type: LOG_ON_USER, payload: {
    isLoggedIn: true,
    username,
    accessToken,
  } };
}
