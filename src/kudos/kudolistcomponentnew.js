import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import { Card } from "./card";
import { FormattedDate } from "../utils/FormattedDate";

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const mapGender = g => {
  if (g === "M") {
    return "male";
  } else {
    return "female";
  }
};

const H3Styled = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;

class KudoListComponent extends Component {
  renderItems(kudos) {
    const { REACT_APP_SERVER = "nlbavwixs" } = process.env;
    if (!kudos) return null;
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
          buttonText={FormattedDate(survey_date)}
          width="10%"
        />
      );
    });
  }

  render() {
    //const kudos = this.props.kudos;
    const {
      data: { loading, kudos, error }
    } = this.props;
    console.log("KudoListComponentNew", this.props, kudos);

    if (loading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div>
        <H3Styled>{`CSAT: Top Surveys (${kudos ? kudos.length : 0})`}</H3Styled>
        <Outer>{this.renderItems(kudos)}</Outer>
      </div>
    );
  }
}

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
