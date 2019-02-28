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
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import blue from "@material-ui/core/colors/blue";
import { AUTH_USER } from "./actions";
import App from "./Nav";
import "./index.css";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import ContextProvider from "./Provider";
import { SharedSnackbarProvider } from "./SharedSnackbar.context";

const {
  REACT_APP_PORT_GRAPHQL = 55555,
  REACT_APP_GRAPHQLSERVER = "nlbavwixs",
  REACT_APP_GRAPHQL_PATH = "",
  REACT_APP_HTTP = "http"
} = process.env;

const prefix = REACT_APP_HTTP.trim();
let uri = `${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}`;
uri = prefix === "https" ? "https://" + uri : "http://" + uri;
console.log(uri);
//`${REACT_APP_HTTP}://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/${REACT_APP_GRAPHQL_PATH}`;
const client = new ApolloClient({
  link: createUploadLink({ uri, credentials: "include" }),
  cache: new InMemoryCache()
});

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(
  createStore
);
const store = createStoreWithMiddleware(reducers);

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

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue
  }
});

const Main = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <BrowserRouter>
            <SharedSnackbarProvider>
              <ContextProvider>
                <App />
                <AppRoutes />
              </ContextProvider>
            </SharedSnackbarProvider>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));

export { Main };
//registerServiceWorker();
