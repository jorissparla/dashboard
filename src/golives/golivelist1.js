import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGoLives } from "../actions/index";
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from "moment";
import Spinner from "../utils/spinner";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import styled from "styled-components";

const getDay = date =>
  moment(date).format("MMM").toUpperCase().substr(0, 3) +
  moment(date).format("DD");

const GoLiveListStyle = styled.div`
  width: 100%;
  margin-right: 10px;
`;

const GoLiveItemStyle = styled(ListItem)`
  background-color: white;
  display:flex;
  flex-direction: column;
  align-items: space-between;
`;

const GoLiveDateStyle = styled.span`
  color: darkBlack;
  font-family: Oswald;
  font-weight: bold;
  font-size: 20px;
`;
const GoLiveCustomerStyle = styled.span`
  color: darkblue;
  font-family: Roboto;
  font-size: 16px;
`;

class GoLiveList1 extends Component {
  componentDidMount() {
    this.props.fetchGoLives();
  }

  componentWillUnmount() {
    clearInterval(this.timerhandle);
  }

  renderItems(items) {
    if (!items) return <div>loading</div>;
    return items.map((item, index) => {
      const key = item.customerid + "-" + item.version;
      let comments = "";
      if (!item.comments) {
        comments = "";
      } else {
        comments = item.comments.length > 300
          ? item.comments.substr(0, 299) + "..."
          : item.comments;
      }
      const i = index % 9;
      const pic = `http://lorempixel.com/400/200/nature/${i}`;
      return (
        <GoLiveItemStyle key={key}>
          <ListItem
            leftAvatar={<Avatar src={pic} />}
            primaryText={
              <GoLiveCustomerStyle>{item.customername}</GoLiveCustomerStyle>
            }
            secondaryText={
              <p>
                <GoLiveDateStyle>{getDay(item.date)}</GoLiveDateStyle>
                {comments}
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider />
        </GoLiveItemStyle>
      );
    });
  }

  render() {
    const { golives } = this.props;
    if (!golives || golives === null) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <GoLiveListStyle>
        <h3>Upcoming Go Lives</h3>
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
export default connect(mapStateToProps, {
  fetchGoLives
})(GoLiveList1);
