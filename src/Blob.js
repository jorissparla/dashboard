import React, { Component } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { blue500 } from "material-ui/styles/colors";
import DashBoard from "./dashboard";
import DashBoardStatsNew from "./DashBoardStatsNew";
import { Header } from "./appnav";
import ContextProvider from "./Provider";
import { SharedSnackbarProvider } from "./SharedSnackbar.context";

const {
  REACT_APP_PORT_GRAPHQL = 4000,
  REACT_APP_GRAPHQLSERVER = "nlbavwixs",
  REACT_APP_GRAPHQL_PATH = "",
  REACT_APP_HTTP = "http"
} = process.env;

const prefix = REACT_APP_HTTP.trim();
let uri = `${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}`;
uri = prefix === "https" ? "https://" + uri : "http://" + uri;
//`${REACT_APP_HTTP}://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/${REACT_APP_GRAPHQL_PATH}`;
const link = createUploadLink({ uri });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

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

class Blob extends Component {
  state = {
    name: "Joris"
  };
  render() {
    return (
      <h1>
        Hallo
        {this.state.name}
      </h1>
    );
  }
}

const Hello = () => <div>Hello</div>;

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <SharedSnackbarProvider>
        <ContextProvider>
          <Header>
            <Router>
              <Blob path="/" />
              <Hello default />
              <DashBoard path="/dashboard" />
              <DashBoardStatsNew path="/statsnew" />
            </Router>
          </Header>
        </ContextProvider>
      </SharedSnackbarProvider>
    </MuiThemeProvider>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
