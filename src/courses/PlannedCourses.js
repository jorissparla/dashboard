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
import AddCourseDialog from "./AddCourseDialog";
import { Title, HeaderRow, HeaderLeft, HeaderRight } from "../styles";

const styles = {
  headerStyle: {
    fontSize: 18,
    width: 200
  },
  headerStyleSmall: {
    fontSize: 18,
    width: 90
  },
  rowStyle: {
    fontSize: 18,
    width: 200
  },
  rowStyleSmall: {
    fontSize: 18,
    width: 90
  },
  button: {
    margin: 12,
    background: "#2196f3"
  },
  button2: {
    margin: 12,
    backgroundColor: "black",
    primaryColor1: "black"
  },
  buttonback: {
    margin: 12,
    backgroundColor: "orange"
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

const HeaderColumn = ({ children, small }) => {
  if (small) {
    return <TableHeaderColumn style={styles.headerStyleSmall}>{children}</TableHeaderColumn>;
  } else return <TableHeaderColumn style={styles.headerStyle}>{children}</TableHeaderColumn>;
};

const RowColumn = ({ children, small }) => {
  if (small) {
    return <TableRowColumn style={styles.rowStyleSmall}>{children}</TableRowColumn>;
  } else return <TableRowColumn style={styles.rowStyle}>{children}</TableRowColumn>;
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
    selected: null,
    disableregister: true
  };

  editRegisterClick = e => {
    this.props.onRegister(this.props.planned[this.state.selected]);
  };
  render() {
    const {
      history,
      planned,
      onRowSelected,
      onCancel,
      course,
      courses,
      hours,
      trainer,
      accounts,
      statuses
    } = this.props;
    console.log("TRAINER", trainer);
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
              secondary={true}
              label="Back to Courses"
              style={styles.buttonback}
              onClick={() => onCancel()}
            />
            <RaisedButton
              label="Edit Registration"
              backgroundColor="#000"
              disabled={this.state.disableregister}
              labelColor="#fff"
              style={styles.button}
              onClick={e => {
                this.editRegisterClick();
              }}
            />
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
            trainers={accounts}
            open={this.state.opennew}
            courses={courses}
            selectedcourse={course.id}
            courseid={course.id}
            trainer={course.trainer}
            statuses={statuses}
            status={course.status}
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
            trainers={accounts}
            open={this.state.openedit}
            courses={courses}
            selectedcourse={course.id}
            trainer={course.trainer}
            courseid={course.id}
            hours={hours}
            status={course.status}
            statuses={statuses}
            id={this.state.id}
            startdate={new Date(this.state.selectedstartdate)}
            enddate={new Date(this.state.selectedenddate)}
            onSave={e => {
              console.log("onSave", e);
              this.props.onUpdate(e);
              this.setState({ openedit: false });
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
                this.setState({ disableregister: false });
                onRowSelected(planned[row]);
              } else {
                onRowSelected(null);
                this.setState({ disableregister: true });
              }
            }
          }}
        >
          <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
            <TableRow>
              <HeaderColumn>STARTDATE</HeaderColumn>
              <HeaderColumn>ENDDATE</HeaderColumn>
              <HeaderColumn small={true}>TRAINER</HeaderColumn>
              <HeaderColumn small={true}>STATUS</HeaderColumn>
              <HeaderColumn small={true}>HOURS</HeaderColumn>
              <HeaderColumn small={true}>STUDENTS</HeaderColumn>
              <HeaderColumn small={true}> </HeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true} showRowHover={true} deselectOnClickaway={false}>
            {planned.map((plan, index) => (
              <TableRow key={index} selectable={true} selected={this.state.selected === index}>
                <RowColumn>{fmtDate(plan.startdate)}</RowColumn>
                <RowColumn>{fmtDate(plan.enddate)}</RowColumn>
                <RowColumn small={true}>{plan.trainer}</RowColumn>
                <RowColumn small={true}>{plan.status}</RowColumn>
                <RowColumn small={true}>{plan.hours}</RowColumn>
                <RowColumn small={true}>{plan.studentcount}</RowColumn>
                <RowColumn small={true}>
                  <EditIcon
                    style={styles.iconStyle}
                    hoverColor={grey400}
                    onClick={() =>
                      this.setState({
                        openedit: true,
                        id: plan.id,
                        trainer: plan.trainer,
                        status: plan.status,
                        selectedstartdate: plan.startdate,
                        selectedenddate: plan.enddate
                      })}
                  />
                  <TrashIcon
                    style={styles.iconStyle2}
                    hoverColor={purple400}
                    onClick={() => this.props.onDelete(plan.id)}
                  />
                </RowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default PlannedCoursesTable;