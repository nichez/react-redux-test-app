import * as actionTypes from "../actions/actionTypes";

interface DashboardState {
  users: any[];
  error: string;
  loading: boolean;
}

const initialState: DashboardState = {
  users: [],
  error: "",
  loading: false,
};

const fetchDashboardStart = (state: DashboardState, action: any) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchDashboardSuccess = (state: DashboardState, action: any) => {
  return {
    ...state,
    users: action.users,
    error: "",
    loading: false,
  };
};

const fetchDashboardFail = (state: DashboardState, action: any) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_DASHBOARD_START:
      return fetchDashboardStart(state, action);
    case actionTypes.FETCH_DASHBOARD_SUCCESS:
      return fetchDashboardSuccess(state, action);
    case actionTypes.FETCH_DASHBOARD_FAIL:
      return fetchDashboardFail(state, action);
    default:
      return state;
  }
};

export default dashboardReducer;
