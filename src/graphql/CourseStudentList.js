import React from "react";
import { List, ListItem } from "material-ui/List";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";

const Title = styled.div`
  font-family:Oswald;
  font-size: 24px;
  flex:8;
  width: 100%;
  background:${props => (props.background ? "lightblue" : "white")}
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StudentList = ({ students }) => {
  return (
    <Paper
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        marginTop: 10
      }}
    >
      <Title>Registered</Title>
      <Div>
        {students.map(({ student }) => {
          console.log("student", student);
          return (
            <Chip style={{ margin: 4 }}>
              {student.picture
                ? <Avatar src={student.picture.data} />
                : <Avatar
                    src={`https://randomuser.me/api/portraits/men/18.jpg`}
                  />}
              {student.fullname}
            </Chip>
          );
        })}{" "}
      </Div>
    </Paper>
  );
};

export default StudentList;
