import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from "moment";
import Spinner from "../utils/spinner";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";

const getDay = date =>
  moment(date)
    .format("MMM")
    .toUpperCase()
    .substr(0, 3) + moment(date).format("DD");

const GoLiveListStyle = styled.div`
  margin-right: 10px;
`;

const GoLiveItemStyle = styled.div`
  background-color: ${props => props["background-color"] && props["background-color"]};

  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const GoLiveDateStyle = styled.div`
  color: darkBlack;
  font-family: Oswald;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  padding-top: 10px;
`;
const GoLiveCustomerStyle = styled.div`
  color: darkblue;
  font-family: Roboto;
  font-size: 16px;
`;

const H5Styled = styled.h3`
  font-family: Oswald;
`;
class GoLiveListSide extends Component {
  renderItems(items) {
    if (!items) return <div>loading</div>;
    return items.map((item, index) => {
      const key = item.customerid + "-" + item.version;

      let color = index % 2 ? "blanchedalmond" : "white";
      return (
        <GoLiveItemStyle background-color={color} key={key}>
          <ListItem
            leftAvatar={<GoLiveDateStyle>{getDay(item.date)}</GoLiveDateStyle>}
            primaryText={
              <div>
                <GoLiveCustomerStyle>{item.customername}</GoLiveCustomerStyle>{" "}
              </div>
            }
            //secondaryText= {item.version}
          />
          <Divider />
        </GoLiveItemStyle>
      );
    });
  }

  render() {
    //const { golives } = this.props;
    const { data: { loading, golives } } = this.props;
    if (loading) {
      <div>
        <Spinner />
      </div>;
    }
    if (!golives || golives === null) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <GoLiveListStyle>
        <H5Styled>Upcoming Go Lives</H5Styled>
        <List style={{ backgroundColor: "white" }}>
          <Divider />
          {this.renderItems(golives)}
        </List>
      </GoLiveListStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    golives: state.summary.golives
  };
};

const queryGoLives = gql`
  query golives {
    golives {
      id
      customername
      customerid
      country
      region
      version
      comments
      date
    }
  }
`;

export default graphql(queryGoLives)(GoLiveListSide);
