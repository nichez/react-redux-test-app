import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./store/reducers/authReducer";
import dashboardReducer from "./store/reducers/dashboardReducer";
import settingsReducer from "./store/reducers/settingsReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
