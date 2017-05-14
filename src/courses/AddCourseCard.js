import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { Tabs, Tab } from "material-ui/Tabs";
import { blue500 } from "material-ui/styles/colors";
import { withRouter, browserHistory } from "react-router";
import { List, ListItem } from "material-ui/List";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import CourseForm from "./CourseForm";
import CourseStudentList from "./CourseStudentList";

const Div = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex-basis: 30%;
`;
const Right = styled.div`
  flex-basis : 65%;
  flex:1;
`;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    backgroundColor: "#2196F3",
    fontWeight: 400
  }
};

class AddCourseCard extends Component {
  state = {};

  constructor(props) {
    super(props);
    console.log("THIS", this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave({
    id,
    team,
    title,
    description,
    link,
    type,
    hours,
    startdate,
    enddate,
    status,
    applicable,
    trainer
  }) {
    console.log("this.props", this.props);
    this.props
      .addCourse({
        id,
        team,
        title,
        description,
        link,
        type,
        hours,
        startdate,
        enddate,
        status,
        applicable,
        trainer
      })
      .then(v => {
        console.log(v);
        browserHistory.push("/courses");
      })
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  }

  render() {
    return (
      <div>
        <Div>

          <Right>
            <CourseForm onSave={this.handleSave} readOnly={false} />
          </Right>
          <Left />
        </Div>

      </div>
    );
  }
}

const AddCourse = gql`
  mutation  addCourse($input: InputCourseType ) {
    addCourse(input: $input ) {
      course {
        id
        applicable
        }
    }
}
  
`;

export default graphql(AddCourse, {
  props: ({ mutate }) => ({
    addCourse: input =>
      mutate({
        variables: {
          input
        }
      })
  })
})(withRouter(AddCourseCard));
