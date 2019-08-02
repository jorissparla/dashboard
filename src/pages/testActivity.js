import React from 'react';
import { ApolloProvider, Subscription, Query } from 'react-apollo';
import gql from 'graphql-tag';

const mySub = gql`
  subscription {
    userCheck {
      id
      fullname
      image
    }
  }
`;

export const UserActivity = () => {
  return (
    <div>
      <h1>Activity</h1>
      <Subscription subscription={mySub}>
        {({ data, loading, error, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>;
          console.log(subscribeToMore);
          return (
            <div>
              {JSON.stringify(data.userCheck, null, 2)} {Date.now()}
            </div>
          );
        }}
      </Subscription>
      <div />
    </div>
  );
};
