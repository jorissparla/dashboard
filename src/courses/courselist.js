import React from 'react';
import { connect } from 'react-redux';
import AddCourseCard from './addcoursecard';
import CourseCard from './coursecard';
import styled from 'styled-components';
import {findAllEnrolledCourses } from '../actions';



const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
 
`

const StyledCard = styled(CourseCard)`
  width: 22%;
  min-width: 200px;

`

class Courselist extends React.Component {
  constructor() {
    super();
  }



  render() {
    const { courses, enrolled} = this.props;
    if (!enrolled) {
      return <div>Loading...</div>
    }
    return (
      <StyledContainer>
        <AddCourseCard />
        {courses.map((course, index)=><StyledCard course={course} key = {course.crs_UIC} index={index} count={enrolled.filter(r=>r.acr_crs_UIC===course.crs_UIC).length}/>)}
      </StyledContainer>)
  }

   async componentDidMount() {
    await this.props.findAllEnrolledCourses()
  }
}

const mapStateToProps = (state) => {
  return {   enrolled: state.courses.enrolled }
}

export default connect(mapStateToProps, {findAllEnrolledCourses})(Courselist);
