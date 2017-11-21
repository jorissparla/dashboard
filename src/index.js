import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reduxThunk from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import { AUTH_USER } from "./actions";
import App from "./appnav";
import "./index.css";

import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";

import registerServiceWorker from "./registerServiceWorker";

const networkInterface = createNetworkInterface({
  uri: "http://nlbavwtls22.infor.com:55555/graphql"
});
const client = new ApolloClient({
  networkInterface
});

injectTapEventPlugin();
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

const Main = () => (
  <ApolloProvider store={store} client={client}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <BrowserRouter>
        <App>
          <AppRoutes />
        </App>
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));

registerServiceWorker();
