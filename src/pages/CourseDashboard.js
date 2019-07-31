import React from 'react';
import styled from 'styled-components';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import addDays from 'date-fns/add_days';
//import format from 'date-fns/format';
import { format } from '../utils/format';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TrainerViewNew from '../courses/TrainerViewNew';
import StudentChip from '../courses/StudentChip';
import StudentTableNew from '../courses/StudentTableNew';
import ScheduledCoursesInPeriod from '../courses/ScheduledCoursesinPeriod';
// import { useUser } from '../User';
import { DashBoardContext } from './../globalState/Provider';

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

class CourseView extends React.Component {
  state = {
    startdate: format(addDays(new Date(), -7), 'YYYY-MM-DD'),
    studentfilterstartdate: format(addDays(new Date(), -180), 'YYYY-MM-DD'),
    studentfilterenddate: format(new Date(), 'YYYY-MM-DD'),
    value: '',
    activeTab: this.props.start ? this.props.start : 'student',
    participants: { show: false, id: null, students: [] }
  };

  componentDidCatch(error) {
    //alert(JSON.stringify(error));
  }

  componentDidMount() {
    // const context = React.useContext(DashBoardContext);
    // console.log('context', context.getUser(), context.role);
    console.log(this.state);
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
    const user = this.props.user;
    const { activeTab } = this.state;
    // const { role = 'Admin' } = user; //this.props.user;
    const role = 'Admin';
    const enabled = role === 'Admin' || role === 'PO';
    const currentYear = new Date().getFullYear();

    console.log(this.state);
    return (
      <React.Fragment>
        <Tabs
          value={this.state.activeTab}
          onChange={(event, value) => {
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
