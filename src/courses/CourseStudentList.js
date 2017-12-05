import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import { Title, HeaderRow, HeaderLeft, HeaderRight } from "../styles";
import StudentChip from "./StudentChip";

const styles = {
  button: {
    margin: 20,
    background: "#2196f3",
    backgroundColor: "black"
  }
};

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
  return [
    <HeaderRow>
      <HeaderLeft>
        <Title>Registered for Selected Course</Title>
      </HeaderLeft>
      <HeaderRight />
    </HeaderRow>,
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
        }
      })}
    </Div>
  ];
};

export default withRouter(StudentList);
