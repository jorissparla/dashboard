import React from "react";
import { CardSection, Input } from "../common";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import UserAvatar from "react-user-avatar";

const styles = {
  TextFieldStyle: {
    flex: 1,
    width: 200,
    padding: 2,
    marginRight: 30
  }
};

const buttonStyle = {
  backgroundColor: "#ffc600",
  labelColor: "white",
  margin: "20px"
};
const buttonStyle2 = {
  backgroundColor: "black",
  labelColor: "white",
  margin: "20px"
};

const teams = [
  { key: "Finance", description: "Finance" },
  { key: "Logistics", description: "Logistics" },
  { key: "Tools", description: "Tools" }
];

const regions = [
  { key: "EMEA", description: "EMEA" },
  { key: "NA", description: "NA" },
  { key: "APJ", description: "APJ" },
  { key: "LA", description: "LA" }
];

class ChatAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [] };
  }

  handleSubmit = e => {
    console.log(this.props.entry.report());
    this.props.onSave();
  };

  doSubmit(values) {
    window.alert(`You submitted Parent:\n\n${JSON.stringify(values, null, 2)}`);
  }

  handleChangeTeam = (e, i, v) => {
    this.props.entry.team = v;
  };
  handleChangeRegion = (e, i, v) => {
    this.props.entry.region = v;
  };
  handleChangeWeek = (e, i, v) => {
    this.props.entry.weeknr = v;
  };

  handleChange = ({ target: { name, value } }) => {
    this.props.entry[name] = value;
  };

  componentDidMount() {
    if (this.props.ranges) {
      this.props.entry.weeknr = this.props.ranges[2].Name;
    }
  }
  render() {
    const { ranges, onSave, onCancel } = this.props;
    console.log(
      "Observe",
      ranges,

      this.props.entry.report()
    );
    if (!ranges) {
      return <CardSection>Loading...</CardSection>;
    }

    return (
      <div>
        <CardSection style={{ fontSize: "36px", fontFamily: "Oswald" }}>
          Add Chat Result
        </CardSection>
        <form>
          <CardSection
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <SelectField
              id="team"
              name="team"
              hintText="Select a team"
              multiple={false}
              onChange={this.handleChangeTeam}
              style={{ flex: 2 }}
              value={this.props.entry.team}
            >
              {teams.map(team => (
                <MenuItem key={team.key} value={team.key} primaryText={team.description} />
              ))}
            </SelectField>
            <SelectField
              id="region"
              name="region"
              hintText="Select a region"
              style={{ flex: 2 }}
              onChange={this.handleChangeRegion}
              value={this.props.entry.region}
            >
              {regions.map(region => (
                <MenuItem key={region.key} value={region.key} primaryText={region.description} />
              ))}
            </SelectField>
          </CardSection>
          <CardSection>
            <SelectField
              name="weeknr"
              id="weeknr"
              hintText="Select a week"
              onChange={this.handleChangeWeek}
              value={this.props.entry.weeknr}
            >
              {ranges.map(range => (
                <MenuItem key={range.Name} value={range.Name} primaryText={range.Name} />
              ))}
            </SelectField>
            <Input name="fromDate" disabled={true} type="text" />
          </CardSection>

          <CardSection id="inputboxes">
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="nrchats"
              floatingLabelText="Number of chats"
              type="number"
              width={2}
              onChange={this.handleChange}
              value={this.props.entry.nrchats}
            />
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="responseintime"
              floatingLabelText="Responded in time"
              type="number"
              onChange={this.handleChange}
              value={this.props.entry.responseintime}
            />
            <TextField
              inputStyle={styles.TextFieldStyle}
              style={styles.TextFieldStyle}
              name="percentage"
              floatingLabelText="Responded in time"
              type="text"
              value={this.props.entry.percentage()}
            />
          </CardSection>
          <CardSection>
            <RaisedButton
              primary={true}
              style={buttonStyle}
              label="Submit"
              onClick={this.handleSubmit}
            />
            <RaisedButton
              secondary={true}
              style={buttonStyle2}
              label="Cancel"
              onClick={onCancel}
              type="reset"
            />
          </CardSection>
        </form>
      </div>
    );
  }
}

export default ChatAdd;
