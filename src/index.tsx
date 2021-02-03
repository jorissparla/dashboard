import { ApolloClient, ApolloProvider, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Spinner from "utils/spinner";
// import { AUTH_USER } from "./actions";
import ContextProvider from "./globalState";
import "./index.css";
import App from "./Navigation/Nav";
// import reducers from "./reducers";
import AppRoutes from "./routes";
import "./styles/app.css";
import { main } from "./styles/globalstyles";

// import { SharedSnackbarProvider } from './globalState/SharedSnackbar.context';

const {
  REACT_APP_PORT_GRAPHQL = 55555,
  REACT_APP_GRAPHQLSERVER = "nlbavwixs",
  // REACT_APP_GRAPHQL_PATH = '',
  REACT_APP_HTTP = "http",
  HTTPS = false,
} = process.env;

const Global = createGlobalStyle`
  ${main}
`;

const prefix = REACT_APP_HTTP.trim();
const isHttps = HTTPS;
console.log("🤷‍♂️🤷‍♂️🤷‍♂️", isHttps, process.env);
export let uri = `${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}`;
const wsuri = prefix === "https" ? "wss://" + uri : "ws://" + uri;
const wsLink = new WebSocketLink({
  uri: wsuri, // use wss for a secure endpoint
  options: {
    reconnect: true,
  },
});
uri = prefix === "https" ? "https://" + uri : "http://" + uri;
const httpLink: any = createUploadLink({ uri, credentials: "include" });
interface Definintion {
  kind: string;
  operation?: string;
}
const link = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

//`${REACT_APP_HTTP}://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/${REACT_APP_GRAPHQL_PATH}`;
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// const token = localStorage.getItem("token");
// const user = {
//   email: localStorage.getItem("email"),
//   picture: localStorage.getItem("picture"),
//   role: localStorage.getItem("role"),
//   fullname: localStorage.getItem("name"),
// };

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#524763",
    },
  },
  typography: {
    h4: {
      // color: palette.text.primary,
      fontWeight: 500,
      fontSize: "18px",
      letterSpacing: "-0.06px",
      lineHeight: "24px",
    },
    h5: {
      // color: palette.text.primary,
      fontWeight: 500,
      fontSize: "16px",
      letterSpacing: "-0.05px",
      lineHeight: "20px",
    },
    body2: {
      // color: palette.text.secondary,
      fontSize: "12px",
      letterSpacing: "-0.04px",
      lineHeight: "18px",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "14px",
      letterSpacing: "-0.05px",
      lineHeight: "21px",
    },
  },
});

const Main = () => (
  <ApolloProvider client={client}>
    {/* <Global /> */}
    {/* <Provider store={store}> */}
    <MuiThemeProvider theme={muiTheme}>
      <ContextProvider>
        <BrowserRouter>
          {/* <SharedSnackbarProvider> */}
          <>
            <App />
            <React.Suspense fallback={<Spinner loadingMessage="Loading data" />}>
              <AppRoutes />
            </React.Suspense>
          </>
          {/* </SharedSnackbarProvider> */}
        </BrowserRouter>
      </ContextProvider>
    </MuiThemeProvider>
    {/* </Provider> */}
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));

export { Main, client };
//registerServiceWorker();
