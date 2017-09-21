import React from "react";

const StyleLoader = ({ stylesheetPath }) => (
  <link rel="stylesheet" type="text/css" href={stylesheetPath} />
);

const StyleLoaderM = () => (
  <StyleLoader stylesheetPath="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css" />
);

export { StyleLoader, StyleLoaderM };
