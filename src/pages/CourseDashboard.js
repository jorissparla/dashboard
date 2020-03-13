import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import { addDays } from 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import ScheduledCoursesInPeriod from '../courses/ScheduledCoursesinPeriod';
import StudentChip from '../courses/StudentChip';
import StudentTableNew from '../courses/StudentTableNew';
import TrainerViewNew from '../courses/TrainerViewNew';
//import format from 'date-fns/format';
import { format } from '../utils/format';

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

const CourseView = props => {
  const [startdate, setStartDate] = useState(format(addDays(new Date(), -7), 'yyyy-MM-dd'));
  const [studentfilterstartdate, setStudentFiterStartDate] = useState(
    format(addDays(new Date(), -180), 'yyyy-MM-dd')
  );
  const [studentfilterenddate, setStudentFilterEndDate] = useState(
    format(addDays(new Date(), -7), 'yyyy-MM-dd')
  );
  const [activeTab, setActiveTab] = React.useState(props.start || 'student');
  const [participants] = useState({ show: false, id: null, students: [] });
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const { classes } = props;

  function handleStartDateChange({ target: { value } }) {
    console.log(value);
    setStartDate(value);
  }
  function handleStudentFilterStartDateChange({ target: { value } }) {
    setStudentFiterStartDate(value);
  }
  function handleStudentFilterEndDateChange({ target: { value } }) {
    setStudentFilterEndDate(value);
  }

  function setYear(year) {
    setCurrentYear(year);
    setStartDate(format(new Date(year, 0, 1), 'yyyy-MM-dd'));
    setStudentFiterStartDate(format(new Date(year, 0, 1), 'yyyy-MM-dd'));
    setStudentFilterEndDate(format(new Date(year + 1, 0, 1), 'yyyy-MM-dd'));
    // enddate: format(new Date(year + 1, 0, 1), 'yyyy-MM-dd');
  }
  // const { role = 'Admin' } = user; //props.user;
  const role = 'Admin';
  const enabled = role === 'Admin' || role === 'PO';

  return (
    <React.Fragment>
      <Tabs
        value={activeTab}
        onChange={(event, value) => {
          setActiveTab(value);
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
                  onClick={() => setYear(currentYear - 1)}
                >
                  {currentYear - 1}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setYear(currentYear)}>
                  {currentYear}
                </Button>
                <div className={classes.text}>From</div>
                <TextField
                  type="date"
                  variant="outlined"
                  label="Enter StartDate Courses"
                  value={studentfilterstartdate}
                  name="studentfilterstartdate"
                  onChange={handleStudentFilterStartDateChange}
                  className={classes.textField}
                />
                <div className={classes.text}>To</div>
                <TextField
                  type="date"
                  variant="outlined"
                  label="Enter End Date Courses"
                  value={studentfilterenddate}
                  name="studentfilterenddate"
                  onChange={handleStudentFilterEndDateChange}
                  className={classes.textField}
                />
              </Title2>
            </HeaderLeft>
            <HeaderRight />
          </HeaderRow>
          <StudentTableNew startdate={studentfilterstartdate} enddate={studentfilterenddate} />
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
                  onClick={() => setYear(currentYear - 1)}
                >
                  {currentYear - 1}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setYear(currentYear)}>
                  {currentYear}
                </Button>
                <div className={classes.text}>Scheduled Training Starting</div>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Enter StartDate Course"
                  value={startdate}
                  onChange={(e, value) => handleStartDateChange(e, value)}
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
          <div>{<ScheduledCoursesInPeriod startdate={startdate} />}</div>
          <StudentChipList>
            {participants &&
              participants.students &&
              participants.students.map(s => (
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
                  onClick={() => setYear(currentYear - 1)}
                >
                  {currentYear - 1}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setYear(currentYear)}>
                  {currentYear}
                </Button>
                <div className={classes.text}>From</div>
                <TextField
                  type="date"
                  variant="outlined"
                  label="Enter StartDate Courses"
                  value={studentfilterstartdate}
                  name="studentfilterstartdate"
                  onChange={handleStudentFilterStartDateChange}
                  className={classes.textField}
                />
                to
                <TextField
                  type="date"
                  variant="outlined"
                  label="Enter End Date Courses"
                  value={studentfilterenddate}
                  name="studentfilterenddate"
                  onChange={handleStudentFilterEndDateChange}
                  className={classes.textField}
                />
              </Title2>
            </HeaderLeft>
            <HeaderRight />
          </HeaderRow>
          <TrainerViewNew from={studentfilterstartdate} to={studentfilterenddate} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default withStyles(styles)(CourseView);
