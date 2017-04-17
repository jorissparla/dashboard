import React from 'react';
import AddCourseCard from './addcoursecard';
import CourseCard from './coursecard';
import styled from 'styled-components';



const StyledContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
 
`

const StyledCard = styled(CourseCard)`
  width: 20%;
  min-width: 200px;

`

class Courselist extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { courses} = this.props;
    console.log('courses', this.props)
    return (
      <StyledContainer>
        <AddCourseCard />
        {courses.map((course, index)=><StyledCard course={course} index={index}/>)}
      </StyledContainer>)
  }

  componentDidMount() {
  }
}

export default Courselist;
