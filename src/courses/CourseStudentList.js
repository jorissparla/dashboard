import React from "react";
import { List, ListItem } from "material-ui/List";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { TitleBar } from "../common/TitleBar";
import { blue500 } from "material-ui/styles/colors";

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
              {student.picture
                ? <Avatar src={student.picture.data} />
                : <Avatar
                    src={`https://randomuser.me/api/portraits/men/18.jpg`}
                  />}
              {student.fullname}
            </Chip>
          );
        })}
      </Div>
    </Paper>
  );
};

export default withRouter(StudentList);
