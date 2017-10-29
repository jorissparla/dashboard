import React from "react";
import Checkbox from "material-ui/Checkbox";
import moment from "moment";
import AutoComplete from "material-ui/AutoComplete";
import { TextArea, ViewText, Button, FlexCol, FlexRow } from "../styles";
import styled from "styled-components";

const Form = styled.form`
  margin: 30px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 5px;
  background: white;
`;

class RequestForm extends React.Component {
  componentWillMount() {
    this.setState(this.props.request);
    this.setState({ accounts: this.props.accounts });
    this.setState({ checked: this.props.request.complete === 1 });
  }
  updateCheck = () => {
    this.setState(oldState => {
      return {
        checked: !oldState.checked,
        complete: oldState.checked ? 0 : 1
      };
    });
  };

  handleChange = ({ target: { name, value } }) => {
    console.log(this.state);
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    this.setState({ updatedAt: Date.now() });
    this.props.onSave(this.state);
  };
  handleSelect = v => {
    this.setState({ assigned: v });
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const datasource = this.props.accounts.map(item => item.fullname);
    return (
      <Form width="800px">
        <FlexCol>
          <h2>Request</h2>
          <FlexRow>
            <ViewText
              placeholder="requested by"
              background="grey"
              color="white"
              width="20%"
            >
              {this.state.name}
            </ViewText>

            <ViewText
              placeholder="requested date"
              width="30%"
              background="grey"
              color="white"
            >
              {moment(Date.parse(this.state.createdAt)).format(
                "dddd, DD-MMM-YYYY"
              )}
            </ViewText>
          </FlexRow>
          <FlexRow>
            <TextArea
              rows="3"
              cols="80"
              width="90%"
              name="text"
              placeholder="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </FlexRow>
          <FlexRow>
            <Checkbox
              label="complete"
              checked={this.state.checked}
              onCheck={this.updateCheck}
              style={{ display: "flex", paddingLeft: 20 }}
            />
            <AutoComplete
              hintText="Assigned to"
              dataSource={datasource}
              filter={AutoComplete.caseInsensitiveFilter}
              onUpdateInput={this.handleSelect}
              style={{ display: "flex", paddingLeft: 20 }}
              name="assigned"
              value={this.state.assigned}
            />
          </FlexRow>
          <FlexRow>
            <Button onClick={this.handleSave} width="100px">
              Save
            </Button>
            <Button onClick={this.handleCancel} width="100px" color="black">
              Cancel
            </Button>
          </FlexRow>
        </FlexCol>
      </Form>
    );
  }
}

export default RequestForm;
