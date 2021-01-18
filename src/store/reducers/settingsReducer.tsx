import * as actionTypes from "../actions/actionTypes";

interface DashboardState {
  photos: any[];
  error: string;
  loading: boolean;
}

const initialState: DashboardState = {
  photos: [],
  error: "",
  loading: false,
};

const fetchSettingsStart = (state: DashboardState, action: any) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchSettingsSuccess = (state: DashboardState, action: any) => {
  return {
    ...state,
    photos: action.photos,
    error: "",
    loading: false,
  };
};

const fetchSettingsFail = (state: DashboardState, action: any) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const settingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS_START:
      return fetchSettingsStart(state, action);
    case actionTypes.FETCH_SETTINGS_SUCCESS:
      return fetchSettingsSuccess(state, action);
    case actionTypes.FETCH_SETTINGS_FAIL:
      return fetchSettingsFail(state, action);
    default:
      return state;
  }
};

export default settingsReducer;
