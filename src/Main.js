import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import reduxThunk from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { blue500 } from "material-ui/styles/colors";
import { AUTH_USER } from "./actions";
import App from "./appnav";
import "./index.css";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
//import registerServiceWorker from "./registerServiceWorker";
import ContextProvider from "./Provider";
import { SharedSnackbarProvider } from "./SharedSnackbar.context";
import { Router } from "@reach/router";
import DashBoardContainer from "./dashboardcontainer";

const {
  REACT_APP_PORT_GRAPHQL = 55555,
  REACT_APP_GRAPHQLSERVER = "nlbavwixs",
  REACT_APP_GRAPHQL_PATH = "",
  REACT_APP_HTTP = "http"
} = process.env;

const prefix = REACT_APP_HTTP.trim();
//console.log("prefix", `<${prefix}>`);
let uri = `${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}`;
uri = prefix === "https" ? "https://" + uri : "http://" + uri;
//`${REACT_APP_HTTP}://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/${REACT_APP_GRAPHQL_PATH}`;
const link = createUploadLink({ uri });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem("token");
const user = {
  email: localStorage.getItem("email"),
  picture: localStorage.getItem("picture"),
  role: localStorage.getItem("role"),
  fullname: localStorage.getItem("name")
};
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, user });
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500
  },
  appBar: {
    height: 50,
    color: blue500,
    textColor: "white"
  },
  toolbar: {
    height: 50,
    backgroundColor: blue500
  },
  menuitemStyle: {
    textColor: "black"
  },
  tabs: {
    backgroundColor: "white",
    textColor: blue500,
    selectedTextColor: "black"
  }
});

const Main = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <SharedSnackbarProvider>
          <ContextProvider>
            <App>
              <Router>
                <DashBoardContainer path="/" />
              </Router>
            </App>
          </ContextProvider>
        </SharedSnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));

export { Main };
//registerServiceWorker();
