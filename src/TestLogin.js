import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Signout from './Signout';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      firstname
      fullname
      email
      image
      role
      permissions {
        permission
      }
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation m {
    signinUser(input: { email: "joris.sparla@infor.com", password: "Infor2018" }) {
      user {
        firstname
      }
    }
  }
`;

const User = props => (
  <Query query={CURRENT_USER_QUERY}>{payload => props.children(payload)}</Query>
);

const Error = ({ error }) => <div className="error">{error}</div>;

const Index = () => (
  <Mutation mutation={SIGNIN_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signin => {
      return (
        <div>
          <h1>Hallo Joris</h1>
          <svg>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
          <User>
            {({ data, loading, error }) => {
              if (loading) {
                return 'Loading.console..';
              }
              if (error) {
                return 'Error ' + error;
              }
              if (!data) {
                return 'no data';
              }
              console.log(data);

              const { me } = data;

              return (
                <React.Fragment>
                  {!me ? (
                    <Button
                      variant="contained"
                      onClick={() => signin().then(data => console.log(data))}
                    >
                      Sign Me in{' '}
                    </Button>
                  ) : (
                    <Signout>
                      {signout => {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              margin: 10,
                              width: 200
                            }}
                          >
                            <img src={me.image} style={{ borderRadius: '50%', width: 48 }} />
                            <Button variant="contained" onClick={signout}>
                              Sign you out
                              {me.fullname}
                            </Button>
                          </div>
                        );
                      }}
                    </Signout>
                  )}
                </React.Fragment>
              );
            }}
          </User>
        </div>
      );
    }}
  </Mutation>
);

export default Index;
