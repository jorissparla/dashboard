import React from "react";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { withClientState } from "apollo-link-state";

const Test = () => (
  <Card>
    <CardTitle>Title</CardTitle>
    <CardText>
      <TextField hintText="hours" errorText="" floatingLabelText="hours" />
    </CardText>
    <CardActions>
      <RaisedButton label="OK" />
    </CardActions>
  </Card>
);
export default Test;
