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
import injectTapEventPlugin from "react-tap-event-plugin";
import { blue500 } from "material-ui/styles/colors";
import { AUTH_USER } from "./actions";
import App from "./appnav";
import "./index.css";

import { ApolloClient, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import registerServiceWorker from "./registerServiceWorker";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://nlbavwtls22.infor.com:55555/graphql" }),
  cache: new InMemoryCache()
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
console.log("MUITHEME", muiTheme);

const Main = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <App>
            <AppRoutes />
          </App>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));

registerServiceWorker();
