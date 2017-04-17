import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {blue500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { fetchCourses} from '../actions'
import CoursesList from './courselist';
import CourseTabs from './coursetabs';

const listOfTabNames = [
  'Logistics',
  'Finance',
  'Tools',
  'General'
];

const Container = styled.div`
     background-color: #cfd8dc;
     height: 1000px;
`

const SearchField = styled(TextField)`
 margin-left:10px;
 background-color: white;
`
const TitleBar = styled.div`
  padding: 10px;
  background-color: #03A9F4;
  color: white;
  font-size: 18px;
`



class CoursesContainer extends React.Component {
  state= { searchText: ''};
  constructor() {
    super();
    this.handleTabSwitch = this.handleTabSwitch.bind(this);
  }

  handleTabSwitch(e) {
    console.log(e)
  }

  render() {
    console.log('State', this.state.searchText)
    if (!this.props.courses[0]) {
      return <div>loading</div>
    }

    const courses = this.props.courses.filter(course=>course.crs_title.toUpperCase().includes(this.state.searchText.toUpperCase()))
    return <Container>
      <TitleBar>
        Courses
      </TitleBar>
      {/*<CourseTabs handleActive={this.handleTabSwitch} tabs={listOfTabNames} />*/}
      <Paper zDepth={3} >
        <FontIcon className="material-icons" >
              search
        </FontIcon>
      <TextField 
         hintText="Search"
         underlineShow={false}
         onChange={(e)=> this.setState({ searchText: e.target.value})}
      />

      {`  ${courses.length} courses found`}
      </Paper>
      <CoursesList courses={courses} />
    </Container>
  }

  componentDidMount() {
    this.props.fetchCourses();
  }
}

const mapStateToProps = ( state) => {
  return {
    courses: state.courses.courses
  }

}

export default connect(mapStateToProps, { fetchCourses})(CoursesContainer);


