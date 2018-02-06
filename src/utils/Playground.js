import React, { Component } from "react";
import Playground from "graphql-playground-react";
import "graphql-playground-react/playground.css";

const { REACT_APP_PORT_GRAPHQL = 55555, REACT_APP_GRAPHQLSERVER = "nlbavwixs" } = process.env;

export default () => {
  return (
    <Playground endpoint={`http://${REACT_APP_GRAPHQLSERVER}:${REACT_APP_PORT_GRAPHQL}/graphql`} />
  );
};
