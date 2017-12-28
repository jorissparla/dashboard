import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { fetchKudos } from "../actions/index";
import { format } from "date-fns";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import styled from "styled-components";
import { Card } from "./card";
import { deepOrange500 } from "material-ui/styles/colors";

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const mapGender = g => {
  if (g === "M") {
    return "male";
  } else {
    return "female";
  }
};

const H3Styled = styled.h4`
  font-family: Oswald;
  margin: 5px;
  padding-left: 10px;
`;

const dateToDMYString = date => {
  return format(date, "DDMMMYYYY");
};

class KudoListComponent extends Component {
  renderItems(kudos) {
    const { REACT_APP_SERVER = "nlbavwixs" } = process.env;
    return kudos.map(({ ownerrep_name, customer_name, account, survey_date, pic }, index) => {
      const mgender = mapGender(account.gender);
      const img = pic ? `${pic}` : `http://${REACT_APP_SERVER}/images/${mgender}.png`;
      const initials = pic
        ? ""
        : ownerrep_name
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase();
      return (
        <Card
          image={img}
          initials={initials}
          key={index}
          text={customer_name}
          title={ownerrep_name}
          buttonText={dateToDMYString(survey_date)}
          width="10%"
        />
      );
    });
  }

  render() {
    //const kudos = this.props.kudos;
    const { data: { loading, kudos } } = this.props;
    console.log("KudoListComponentNew", this.props);

    if (loading) {
      return <div>Loading</div>;
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <H3Styled>{`Kudos💚 (${kudos.length})`}</H3Styled>
          <Outer>{this.renderItems(kudos)}</Outer>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return { kudos: state.summary.kudos };
};

const kudosQuery = gql`
  query kudosQuery {
    kudos(region: "EMEA") {
      pic
      customer_name
      survey_date
      account {
        gender
      }
      ownerrep_name
    }
  }
`;

export default graphql(kudosQuery)(KudoListComponent);
