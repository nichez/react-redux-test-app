import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string, userId: string, email: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    email: email,
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: any) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  console.log("actions auth ", email, password, isSignup);
  return (dispatch: any) => {
    dispatch(authStart());
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDnGWemE7OAhMF3xXnuYIVf-yaJJy7xVxU";
    if (!isSignup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDnGWemE7OAhMF3xXnuYIVf-yaJJy7xVxU";
    }

    axios
      .post(url, { email, password })
      .then((response) => {
        console.log("firebase data login ", response);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("email", response.data.email);
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.email
          )
        );
      })
      .catch((err) => {
        console.log('AKCIJA ERRP ', err.message)
        dispatch(authFail(err.message));
      });
  };
};
