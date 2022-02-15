
import {
  USER_LOGIN_FETCHING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_CLEARDATA,
} from "../type";
import axios from "axios";
import qs from "querystring";
import addRole from "../../business/AddUserBusiness"

export const login = (request_data:any) => {
  return (dispatch:any) => {
    dispatch({
      type: USER_LOGIN_FETCHING
    });

    axios
      .post(`${process.env.REACT_APP_AUTHENTICATION_URL}/connect/token`,
        qs.stringify(request_data),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(function (response) {
        var roleinfo = addRole.AddRoleOption(response)

        if (roleinfo!=null) {
          const result={"username":request_data.username,"access_token":response.data.access_token}
          login_request_success(dispatch,result);
        }
        else {
          login_request_failure(dispatch,"show error_description")
        }

      })
      .catch(function (error) {
        login_request_failure(dispatch,"show error_description")

      });

  }
};

const login_request_success = (dispatch:any, data:any) => {

  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data,

  });
};

const login_request_failure = (dispatch:any, error:any) => {
  dispatch({
    type: USER_LOGIN_FAILURE,
    payload: error
  });
};



export const logout = (request_data:any) => {
  return (dispatch:any) => {
    dispatch({
      type: USER_LOGIN_FETCHING
    });

    axios
      .post(`${process.env.REACT_APP_AUTHENTICATION_URL}/connect/token`,
        qs.stringify(request_data),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(function (response) {
        var roleinfo = addRole.AddRoleOption(response)

        if (roleinfo!=null) {
          const result={"username":request_data.username,"access_token":response.data.access_token}
          logout_request_success(dispatch,result);
        }
        else {
          logout_request_failure(dispatch,"show error_description")
        }

      })
      .catch(function (error) {
        logout_request_failure(dispatch,"show error_description")

      });

  }
};

const logout_request_success = (dispatch:any, data:any) => {

  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data,

  });
};

const logout_request_failure = (dispatch:any, error:any) => {
  dispatch({
    type: USER_LOGIN_FAILURE,
    payload: error
  });
};