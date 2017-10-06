import React from "react";
import { Papier, Form, TextArea, Input, Button, ViewText, FlexCol, FlexRow } from "../styles";

const RequestForm = ({ name = "", text = "", createdAt = "" }) => {
  return (
    <form>
      <FlexCol>
        <h2>Request</h2>
        <FlexRow>
          <ViewText placeholder="requested by" background="grey" color="white" width="20%">
            {name}
          </ViewText>

          <ViewText placeholder="requested date" width="70%">
            {createdAt}
          </ViewText>
        </FlexRow>
        <TextArea rows="5" cols="80" width="90%" placeholder="text" defaultValue={text} />
        <Input placeholder="owner" />
      </FlexCol>
    </form>
  );
};
export default RequestForm;
