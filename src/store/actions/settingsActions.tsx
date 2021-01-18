import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchSettingsStart = () => {
  return {
    type: actionTypes.FETCH_SETTINGS_START,
  };
};

export const fetchSettingsSuccess = (photos: any[]) => {
  return {
    type: actionTypes.FETCH_SETTINGS_SUCCESS,
    photos: photos,
  };
};

export const fetchSettingsFail = (error: any) => {
  return {
    type: actionTypes.FETCH_SETTINGS_FAIL,
    error: error,
  };
};

export const fetchSettings = () => {
  return (dispatch: any) => {
    dispatch(fetchSettingsStart());

    let url = "https://jsonplaceholder.typicode.com/photos";
    axios
      .get(url)
      .then((data: any) => {
        const resData = data.data.slice(0, 10);
        dispatch(fetchSettingsSuccess(resData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchSettingsFail(error));
      });
  };
};
