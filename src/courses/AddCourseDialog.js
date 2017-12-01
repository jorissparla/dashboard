import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import styled from "styled-components";

const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;

const styles = {
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: "#2196f3"
  }
};

class AddCourseDialog extends React.Component {
  state = {
    selectedcourse: null,
    error: { startdate: "", enddate: "" }
  };
  componentDidMount() {
    const { selectedcourse, startdate, enddate, status, courseid, hours, id } = this.props;
    this.setState({
      startdate,
      enddate,
      selectedcourse,
      id,
      courseid,
      hours,
      status: status ? status : "Planned"
    });
  }

  handleChange = (event, index, selectedcourse) => {
    console.log(" course ", selectedcourse, event);
    this.setState({ selectedcourse });
  };

  validate = () => {
    console.log("Validating", this.state);
    this.setState({ error: { startdate: "", enddate: "" } });
    if (!this.state.startdate) {
      this.setState({ ...this.state.error, error: { startdate: "Field(s) can not be empty" } });
      return;
    }
    if (!this.state.enddate) {
      this.setState({ ...this.state.error, error: { enddate: "Field(s) can not be empty" } });
      return;
    }
    console.log("Saving", this.state);
    this.props.onSave(this.state);
  };

  validStyle = (val, fld) => {
    console.log(this.state, "fld", fld);
    //console.log("ValidStyle", val, "error", this.state.error);
    if (this.state.error[fld] === "") {
      return { fontColor: "black", borderStyle: "none" };
    }
    return { borderColor: "palevioletred", borderStyle: "solid" };
  };

  render() {
    const { open, onSave, onCancel, courses } = this.props;
    console.log("Render", this.state);
    return (
      <Dialog open={open} style={{ width: "80%" }}>
        <Title>Course Scheduling</Title>
        <div>
          <SelectField
            fullWidth={true}
            hintText="Select Course"
            floatingLabelText="Course"
            value={this.state.selectedcourse}
            onChange={this.handleChange}
          >
            {courses.map(course => (
              <MenuItem key={course.id} value={course.id} primaryText={course.title} />
            ))}
          </SelectField>
        </div>
        <div>
          starts<DatePicker
            autoOk={true}
            textFieldStyle={this.validStyle(this.state.startdate, "enddate")}
            hintText="Enter StartDate Course"
            value={this.state.startdate}
            name="startdate"
            onChange={(e, startdate) => this.setState({ startdate })}
          />
          ends{" "}
          <DatePicker
            autoOk={true}
            textFieldStyle={this.validStyle(this.state.enddate, "startdate")}
            hintText="Enter End Date Course"
            name="enddate"
            value={this.state.enddate}
            onChange={(e, enddate) => this.setState({ enddate })}
          />
        </div>
        <RaisedButton
          style={styles.button}
          primary={true}
          label="Save"
          onTouchTap={() => this.validate()}
        />
        <RaisedButton style={styles.button} primary={false} label="Cancel" onTouchTap={onCancel} />
      </Dialog>
    );
  }
}

export default AddCourseDialog;
