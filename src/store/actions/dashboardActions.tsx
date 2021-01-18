import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchDashboardStart = () => {
  return {
    type: actionTypes.FETCH_DASHBOARD_START,
  };
};

export const fetchDashboardSuccess = (users: any[]) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_SUCCESS,
    users: users,
  };
};

export const fetchDashboardFail = (error: any) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_FAIL,
    error: error,
  };
};

export const fetchDashboard = () => {
  return (dispatch: any) => {
    dispatch(fetchDashboardStart());

    let url = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(url)
      .then((data: any) => {
        dispatch(fetchDashboardSuccess(data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchDashboardFail(error));
      });
  };
};
