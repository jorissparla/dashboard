import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { TitleBar } from "../common/TitleBar";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StudentList = ({ students, history }) => {
  return (
    <Paper
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        marginTop: 10,
        marginRight: 5
      }}
    >
      <TitleBar>Registered</TitleBar>
      <Div>
        {students.map(({ student }) => {
          return (
            <Chip
              style={{
                margin: 4,
                backgroundColor: "#B3E5FC",
                color: "#FFFFFF"
              }}
              key={student.id}
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
    </Paper>
  );
};

export default withRouter(StudentList);
