import React from "react";
import { TextArea, Input, ViewText, Button, FlexCol, FlexRow, Avatar } from "../styles";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import AutoComplete from "material-ui/AutoComplete";

class RequestForm extends React.Component {
  state = { text: this.props.text, owner: this.props.owner };

  handleChange = ({ target: { name, value } }) => {
    console.log("-", name, "-", value);
    this.setState({
      [name]: value
    });
  };

  handleSelect = v => {
    this.setState({ owner: v });
  };
  render() {
    const { name = "", text = "", createdAt = "", accounts } = this.props;
    const datasource = accounts.map(item => item.fullname);
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
          <TextArea
            rows="3"
            cols="80"
            width="90%"
            name="text"
            placeholder="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <FlexRow>
            <AutoComplete
              hintText="Owner"
              dataSource={datasource}
              filter={AutoComplete.caseInsensitiveFilter}
              onUpdateInput={this.handleSelect}
              name="owner"
              value={this.state.owner}
            />
          </FlexRow>
          <Button label="Update" primary={true} onClick={this.props.handleClose} width="100px">
            Submit 💪
          </Button>
        </FlexCol>
      </form>
    );
  }
}
export default RequestForm;
