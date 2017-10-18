import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchKudos } from "../actions/index";
import moment from "moment";
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
  return moment(date).format("DD") + moment(date).format("MMM") + moment(date).format("YYYY");
};

class KudoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tijd: 0
    };
  }

  componentDidMount() {
    this.props.fetchKudos();
  }

  renderItems(kudos) {
    const nrKudos = this.props.kudos.length;
    let kl = kudos.slice(0, nrKudos);

    return kl.map(({ ownerrep_name, customer_name, gender, survey_date, pic }, index) => {
      const mgender = mapGender(gender);
      const img = pic ? `${pic}` : `http://nlbavwtls22/images/${mgender}.png`;

      return (
        <Card
          image={img}
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
    const kudos = this.props.kudos;

    if (!kudos) {
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

export default connect(mapStateToProps, { fetchKudos })(KudoListComponent);
