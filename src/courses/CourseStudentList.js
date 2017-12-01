import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import { Title, HeaderRow, HeaderLeft, HeaderRight } from "../styles";

const styles = {
  button: {
    margin: 12,
    background: "#2196f3"
  }
};

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin-top: 20px;
`;

const StudentList = ({ students, history }) => {
  console.log("students", students);
  if (!students) {
    return <div>No Students registered</div>;
  }
  return [
    <HeaderRow>
      <HeaderLeft>
        <Title>Registered for Selected Course</Title>
      </HeaderLeft>
      <HeaderRight>
        <RaisedButton
          label="New"
          primary={true}
          style={styles.button}
          onClick={() => console.log('click'))}
        />
      </HeaderRight>
    </HeaderRow>,
    <Div>
      {students.map((student, index) => {
        if (student)
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
