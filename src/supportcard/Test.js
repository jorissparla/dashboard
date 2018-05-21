import React from "react";

import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

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
