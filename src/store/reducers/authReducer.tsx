import * as actionTypes from "../actions/actionTypes";

interface AuthState {
  token: string;
  userId: string;
  email: string;
  error: string;
  loading: boolean;
}

const initialState: AuthState = {
  token: "",
  userId: "",
  email: "",
  error: "",
  loading: false,
};

const authStart = (state: AuthState, action: any) => {
  return {
    ...state,
    error: "",
    loading: true,
  };
};

const authSuccess = (state: AuthState, action: any) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    email: action.email,
    error: "",
    loading: false,
  };
};

const authFail = (state: AuthState, action: any) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const authLogout = (state: AuthState, action: any) => {
  return {
    ...state,
    token: "",
  };
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
