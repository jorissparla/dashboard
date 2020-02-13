import React from 'react';
// import GraphiQL from "graphiql";
import GraphiQL from 'graphiql-with-extensions';
import './Playground.css';
const URL = 'https://nlbavwixs.infor.com:4001/';

function graphQLFetcher(graphQLParams) {
  return fetch(URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

const defaultQuery = `
{
  accounts {
    fullname
  }
}
`;
const Playground = () => {
  return (
    <div style={{ height: 1000 }}>
      <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />
    </div>
  );
};

export default Playground;
