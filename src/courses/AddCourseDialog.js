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
    selectedcourse: null
  };
  componentDidMount() {
    const { selectedcourse, startdate, enddate, status } = this.props;
    this.setState({ startdate, enddate, status, selectedcourse });
  }

  handleChange = (event, index, selectedcourse) => {
    console.log(" course ", selectedcourse, event);
    this.setState({ selectedcourse });
  };

  render() {
    const { open, onSave, onCancel, courses } = this.props;
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
              <MenuItem key={course.id} value={course.id} primaryText={course.description} />
            ))}
          </SelectField>
        </div>
        <div>
          starts<DatePicker
            autoOk={true}
            hintText="Enter StartDate Course"
            value={this.state.startdate}
            onChange={(e, startdate) => this.setState({ startdate })}
          />
          ends{" "}
          <DatePicker
            autoOk={true}
            hintText="Enter End Date Course"
            value={this.state.enddate}
            onChange={(e, enddate) => this.setState({ enddate })}
          />
        </div>
        <RaisedButton
          style={styles.button}
          primary={true}
          label="Save"
          onTouchTap={() => onSave(this.state)}
        />
        <RaisedButton style={styles.button} primary={false} label="Cancel" onTouchTap={onCancel} />
      </Dialog>
    );
  }
}

export default AddCourseDialog;
