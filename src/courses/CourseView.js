import React from 'react';
import styled from 'styled-components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TrainerViewNew from './TrainerViewNew';
import StudentChip from './StudentChip';
import StudentTableNew from './StudentTableNew';
import ScheduledCoursesInPeriod from './ScheduledCoursesinPeriod';

const StudentChipList = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2px;
  color: hsla(0, 0%, 93%, 1);
  border-radius: 4px;
  border: solid 1px lightgray;
`;

const Title2 = styled.h3`
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Raleway;
  padding-left: 30px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-grow: 5;
`;

const HeaderRight = styled.div``;

const styles = theme => ({
  headerStyle: {
    fontSize: 18
  },
  button: {
    margin: 12,
    background: '#2196f3'
  },
  tabStyle: {
    backgroundColor: '#2196f3',
    fontSize: '1rem'
  },
  textField: {
    margin: 10,
    width: 250
  },
  datePicker: {
    marginLeft: 12,
    width: 150
  },
  text: {
    marginLeft: 10,
    marginRight: 10
  }
});

const HeaderColumn = ({ style, children }) => {
  const newStyle = _.extend({}, styles.headerStyle, style);
  return <TableCell style={newStyle}>{children}</TableCell>;
};
class CourseView extends React.Component {
  state = {
    startdate: format(addDays(new Date(), -7), 'YYYY-MM-DD'),
    studentfilterstartdate: format(addDays(new Date(), -180), 'YYYY-MM-DD'),
    studentfilterenddate: format(new Date(), 'YYYY-MM-DD'),
    value: '',
    activeTab: 'student',
    participants: { show: false, id: null, students: [] }
  };

  componentDidCatch(error) {
    //alert(JSON.stringify(error));
  }
  handleStartDateChange = ({ target: { value } }) => {
    console.log(value);
    this.setState({ startdate: value });
  };
  handleStudentFilterStartDateChange = ({ target: { value } }) => {
    this.setState({ studentfilterstartdate: value });
  };
  handleStudentFilterEndDateChange = ({ target: { value } }) => {
    this.setState({ studentfilterenddate: value });
  };

  setYear = year => {
    this.setState({
      startdate: format(new Date(year, 0, 1), 'YYYY-MM-DD'),
      studentfilterstartdate: format(new Date(year, 0, 1), 'YYYY-MM-DD'),
      studentfilterenddate: format(new Date(year + 1, 0, 1), 'YYYY-MM-DD'),
      enddate: format(new Date(year + 1, 0, 1), 'YYYY-MM-DD')
    });
  };
  render() {
    const { classes } = this.props;

    const { value, activeTab } = this.state;
    const { role } = this.props.user;
    const enabled = role === 'Admin' || role === 'PO';
    const currentYear = new Date().getFullYear();

    console.log(this.state);
    return (
      <React.Fragment>
        <Tabs
          value={this.state.activeTab}
          onChange={(event, value) => {
            console.log('Value', value);
            this.setState({ activeTab: value });
          }}
        >
          <Tab label="Training By Student" value="student" />
          <Tab label="Scheduled Course" value="scheduled" />
          <Tab label="By Trainer" value="trainer" />
        </Tabs>
        {activeTab === 'student' && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.setYear(currentYear)}
                  >
                    {currentYear}
                  </Button>
                  <div className={classes.text}>From</div>
                  <TextField
                    type="date"
                    variant="outlined"
                    label="Enter StartDate Courses"
                    value={this.state.studentfilterstartdate}
                    name="studentfilterstartdate"
                    onChange={this.handleStudentFilterStartDateChange}
                    className={classes.textField}
                  />
                  <div className={classes.text}>To</div>
                  <TextField
                    type="date"
                    variant="outlined"
                    label="Enter End Date Courses"
                    value={this.state.studentfilterenddate}
                    name="studentfilterenddate"
                    onChange={this.handleStudentFilterEndDateChange}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight />
            </HeaderRow>
            <StudentTableNew
              startdate={this.state.studentfilterstartdate}
              enddate={this.state.studentfilterenddate}
            />
          </React.Fragment>
        )}
        {activeTab === 'scheduled' && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                {' '}
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.setYear(currentYear)}
                  >
                    {currentYear}
                  </Button>
                  <div className={classes.text}>Scheduled Training Starting</div>
                  <TextField
                    variant="outlined"
                    type="date"
                    label="Enter StartDate Course"
                    value={this.state.startdate}
                    onChange={(e, value) => this.handleStartDateChange(e, value)}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight>
                <Button disabled={!enabled} color="primary" onClick={() => console.log('new')}>
                  New
                </Button>
              </HeaderRight>
            </HeaderRow>
            <div>
              <ScheduledCoursesInPeriod startdate={this.state.startdate} />
            </div>
            <StudentChipList>
              {this.state.participants &&
                this.state.participants.students &&
                this.state.participants.students.map(s => (
                  <StudentChip key={s.id} id={s.id} fullname={s.fullname} image={s.image} />
                ))}
            </StudentChipList>
          </React.Fragment>
        )}
        {activeTab === 'trainer' && (
          <React.Fragment>
            <HeaderRow>
              <HeaderLeft>
                {' '}
                <Title2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setYear(currentYear - 1)}
                  >
                    {currentYear - 1}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.setYear(currentYear)}
                  >
                    {currentYear}
                  </Button>
                  <div className={classes.text}>From</div>
                  <TextField
                    type="date"
                    variant="outlined"
                    label="Enter StartDate Courses"
                    value={this.state.studentfilterstartdate}
                    name="studentfilterstartdate"
                    onChange={this.handleStudentFilterStartDateChange}
                    className={classes.textField}
                  />
                  to
                  <TextField
                    type="date"
                    variant="outlined"
                    label="Enter End Date Courses"
                    value={this.state.studentfilterenddate}
                    name="studentfilterenddate"
                    onChange={this.handleStudentFilterEndDateChange}
                    className={classes.textField}
                  />
                </Title2>
              </HeaderLeft>
              <HeaderRight />
            </HeaderRow>
            <TrainerViewNew
              from={this.state.studentfilterstartdate}
              to={this.state.studentfilterenddate}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(CourseView);
