import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { TitleBar } from "../common/TitleBar";
import { Title } from "../styles";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StudentList = ({ students, history }) => {
  console.log("students", students);
  return [
    <Title>Registered</Title>,
    <Div>
      {students.map((student, index) => {
        return (
          <Chip
            style={{
              margin: 4,
              backgroundColor: "#B3E5FC",
              color: "#FFFFFF"
            }}
            key={student.id ? student.id : index}
            onClick={() => history.push(`/students/${student.id}`)}
          >
            {student.image ? (
              <Avatar src={student.image} />
            ) : (
              <Avatar src={`https://randomuser.me/api/portraits/men/18.jpg`} />
            )}
            {student.fullname}
          </Chip>
        );
      })}
    </Div>
  ];
};

export default withRouter(StudentList);
