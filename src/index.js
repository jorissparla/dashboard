import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reduxThunk from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import { browserHistory, Router } from "react-router";
import routes from "./routes";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import Raven from "raven-js";
import { AUTH_USER } from "./actions";

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: "https://nlbavwtls22.infor.com:55555/graphql"
});
const client = new ApolloClient({
  networkInterface
});
Raven.config(
  "https://dc36f9e386c04e4b979cbda7dd297c6e@sentry.io/163871"
).install();

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(
  createStore
);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const token = localStorage.getItem("token");
const user = {
  email: localStorage.getItem("email"),
  picture: localStorage.getItem("picture"),
  role: localStorage.getItem("role")
};
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, user });
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
