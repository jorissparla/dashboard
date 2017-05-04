import React from "react";
import { List, ListItem } from "material-ui/List";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
//@ts-check
import Avatar from "material-ui/Avatar";
import { CardSection } from "../common";

const StudentList = ({ students }) => (
  <div>
    <CardSection>
      <RaisedButton label="Add" primary={true} />
    </CardSection>
    <List style={{ backgroundColor: "#FFFFFF", marginTop: "10px" }}>

      {students.map(student => {
        console.log("student", student);
        return (
          <div key={student.id}>
            <ListItem
              primaryText={student.student.fullname}
              leftAvatar={
                student.student.picture
                  ? <Avatar src={student.student.picture.data} />
                  : <Avatar src="https://randomuser.me/api/portraits/men/42.jpg" />
              }
              secondaryText={student.status}
            />
            <Divider />
          </div>
        );
      })}
    </List>
  </div>
);

export default StudentList;
