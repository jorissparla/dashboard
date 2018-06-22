import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Title, HeaderRow, HeaderLeft, HeaderRight } from "../styles";
import StudentChip from "./StudentChip";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
`;

const StudentList = ({ students, history, id }) => {
  if (!students) {
    return <div>No Students registered</div>;
  }
  return (
    <React.Fragment>
      <HeaderRow>
        <HeaderLeft>
          <Title>Registered for Selected Course</Title>
        </HeaderLeft>
        <HeaderRight />
      </HeaderRow>
      <Div>
        {students.map((student, index) => {
          if (student) {
            const { id, fullname, image } = student;

            return (
              <StudentChip
                id={id}
                key={id}
                fullname={fullname}
                image={image}
                handleClick={() => history.push(`/students/${id}`)}
              />
            );
          } else return <div />;
        })}
      </Div>
    </React.Fragment>
  );
};

export default withRouter(StudentList);
