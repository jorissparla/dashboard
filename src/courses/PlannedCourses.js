import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import RaisedButton from "material-ui/RaisedButton";
import { blue500, red500, grey400, purple400 } from "material-ui/styles/colors";
import { format } from "date-fns";
import styled from "styled-components";
import AddCourseDialog from "./AddCourseDialog";
import { Title, HeaderRow, HeaderLeft, HeaderRight } from "../styles";

const styles = {
  headerStyle: {
    fontSize: 18,
    width: 200
  },
  rowStyle: {
    fontSize: 18,
    width: 200
  },
  button: {
    margin: 12,
    background: "#2196f3"
  },

  iconStyle: {
    width: 24,
    color: blue500
  },
  iconStyle2: {
    width: 24,
    color: red500
  }
};

const fmtDate = val => {
  return format(val, "ddd, DD MMM YYYY");
};

const HeaderColumn = ({ children }) => {
  return <TableHeaderColumn style={styles.headerStyle}>{children}</TableHeaderColumn>;
};

const RowColumn = ({ children }) => {
  return <TableRowColumn style={styles.rowStyle}>{children}</TableRowColumn>;
};

class PlannedCoursesTable extends React.Component {
  state = {
    startdate: new Date(),
    open: false,
    openedit: false,
    opennew: false,
    courseid: null,
    value: "",
    minDate: null,
    defaultDate: Date.now(),
    selected: null
  };
  render() {
    const { planned, onRowSelected, course, courses, hours, selected } = this.props;
    console.log("PlannedCourse", course);
    const courseid = course.id;
    return (
      <div>
        <HeaderRow>
          <HeaderLeft>
            <Title>
              Scheduled Courses for <strong>{course.title}</strong>
            </Title>
          </HeaderLeft>
          <HeaderRight>
            <RaisedButton
              label="New"
              primary={true}
              style={styles.button}
              onClick={() => this.setState({ opennew: true })}
            />
          </HeaderRight>
        </HeaderRow>
        {this.state.opennew === true && (
          <AddCourseDialog
            open={this.state.opennew}
            courses={courses}
            selectedcourse={course.id}
            courseid={course.id}
            hours={hours}
            onSave={e => {
              console.log("onSave", JSON.stringify(e));
              this.props.onAddNew(e);
              this.setState({ opennew: false });
            }}
            onCancel={() => this.setState({ opennew: false })}
          />
        )}
        {this.state.openedit === true && (
          <AddCourseDialog
            open={this.state.openedit}
            courses={courses}
            selectedcourse={course.id}
            courseid={course.id}
            hours={hours}
            id={this.state.id}
            startdate={new Date(this.state.selectedstartdate)}
            enddate={new Date(this.state.selectedenddate)}
            onSave={e => {
              console.log("onSave", JSON.stringify(e));
              this.setState({ openedit: false });
              this.props.onUpdate(e);
            }}
            onCancel={() => this.setState({ openedit: false })}
          />
        )}
        <Table
          selectable={true}
          multiSelectable={false}
          onRowSelection={([row]) => {
            this.setState({ selected: row });
            if (onRowSelected) {
              if (row >= 0) {
                onRowSelected(planned[row]);
              } else {
                onRowSelected(null);
              }
            }
          }}
        >
          <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
            <TableRow>
              <HeaderColumn>STARTDATE</HeaderColumn>
              <HeaderColumn>ENDDATE</HeaderColumn>
              <HeaderColumn style={{ width: 90 }} s>
                STATUS
              </HeaderColumn>
              <HeaderColumn />
              <HeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true} showRowHover={true}>
            {planned.map((plan, index) => (
              <TableRow key={index} selectable={true} selected={this.state.selected === index}>
                <RowColumn>{fmtDate(plan.startdate)}</RowColumn>
                <RowColumn>{fmtDate(plan.enddate)}</RowColumn>
                <RowColumn>{plan.status}</RowColumn>
                <RowColumn>
                  <EditIcon
                    style={styles.iconStyle}
                    hoverColor={grey400}
                    onClick={() =>
                      this.setState({
                        openedit: true,
                        id: plan.id,
                        selectedstartdate: plan.startdate,
                        selectedenddate: plan.enddate
                      })}
                  />
                  <TrashIcon style={styles.iconStyle2} hoverColor={purple400} />
                </RowColumn>
                <RowColumn />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default PlannedCoursesTable;
