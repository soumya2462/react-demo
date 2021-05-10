import { Reducer } from "react";

//actions
export const UPDATE_USER = 'UPDATE_USER';

export type AuthState = {
  username: string,
  accessToken: string,
  isLoggedIn: boolean,
};

interface AuthAction {
  type: string,
  payload: AuthState,
};

const initialState: AuthState = {
  username: '',
  accessToken: '',
  isLoggedIn: false,
};

//reducer
export function authReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
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
    username: '',
    accessToken: '',
  } };
}