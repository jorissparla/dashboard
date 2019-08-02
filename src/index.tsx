import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import './index.css';
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createGlobalStyle } from 'styled-components';
import { AUTH_USER } from './actions';
import App from './Navigation/Nav';
import './index.css';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import ContextProvider from './globalState';
import { main } from './styles/globalstyles';
import Spinner from 'utils/spinner';
// import { SharedSnackbarProvider } from './globalState/SharedSnackbar.context';

const {
  REACT_APP_PORT_GRAPHQL = 55555,
  REACT_APP_GRAPHQLSERVER = 'nlbavwixs',
  REACT_APP_GRAPHQL_PATH = '',
  REACT_APP_HTTP = 'http'
} = process.env;

const Global = createGlobalStyle`
  ${main}
`;

const prefix = REACT_APP_HTTP.trim();
let uri = `${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}`;
const wsLink = new WebSocketLink({
  uri: `ws://${uri}`, // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});
uri = prefix === 'https' ? 'https://' + uri : 'http://' + uri;
const httpLink = createUploadLink({ uri, credentials: 'include' });
interface Definintion {
  kind: string;
  operation?: string;
}
const link = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

//`${REACT_APP_HTTP}://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/${REACT_APP_GRAPHQL_PATH}`;
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const user = {
  email: localStorage.getItem('email'),
  picture: localStorage.getItem('picture'),
  role: localStorage.getItem('role'),
  fullname: localStorage.getItem('name')
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
    primary: {
      main: '#524763'
    }
  }
});

const Main = () => (
  <ApolloProvider client={client}>
    <Global />
    <ApolloHooksProvider client={client}>
      <Provider store={store}>
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
      </Provider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

export { Main };
//registerServiceWorker();
