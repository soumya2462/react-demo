import expect from 'expect';
import {
  authReducer,
  UPDATE_USER,
} from './Auth';

const initialState = {
  username: '',
  accessToken: '',
  isLoggedIn: false,
};

describe('Auth reducer -', () => {
  it('should return the initial state', () => {
    const validAction = {
      type: '',
      payload: {
        username: 'someUser',
        accessToken: 'someToken',
        isLoggedIn: true,
      },
    };

    expect(authReducer(undefined, validAction)).toEqual(initialState);
  });

  it('should handle logOn UPDATE_USER', () => {
    const action = {
      type: UPDATE_USER,
      payload: {
        isLoggedIn: true,
        username: 'test_username',
        accessToken: 'test_accessToken',
      },
    };

    const expectedState = {
      username: 'test_username',
      accessToken: 'test_accessToken',
      isLoggedIn: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logOff UPDATE_USER', () => {
    const initialStateLoggedIn = {
      username: 'test_username',
      accessToken: 'test_accessToken',
      isLoggedIn: true,
    };

    const action = {
      type: UPDATE_USER,
      payload: {
        isLoggedIn: false,
        username: '',
        accessToken: '',
      },
    };

    const expectedState = {
      username: '',
      accessToken: '',
      isLoggedIn: false,
    };

    expect(authReducer(initialStateLoggedIn, action)).toEqual(expectedState);
  });
});
