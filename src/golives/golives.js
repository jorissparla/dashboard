import React from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import UserAvatar from "react-user-avatar";
import { fetchGoLives } from "../actions";
import moment from "moment";

const styles = {
  listStyle: {
    backgroundColor: "white",
    marginRight: 20
  },
  subheaderStyle: {
    fontSize: 56,
    fontFamily: "Oswald",
    color: "dodgerblue",
    marginLeft: 20,
    marginTop: 20,
    padding: 10
  },
  avatarStyle: {
    flexDirection: "column",
    fontSize: 10,
    width: "50px",
    justifyContent: "center"
  },
  dateStyle: {
    fontSize: "16px",
    fontWeight: "900"
  }
};

const getDay = date =>
  moment(date)
    .format("MMM")
    .toUpperCase()
    .substr(0, 3) + moment(date).format("DD");

const colorAr = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#FFFF00", "#E57373"];

function getColor(index, colorAr) {
  return colorAr[index % colorAr.length];
}

function shortCustomerName(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .join(" ");
}

class GoLiveList extends React.Component {
  componentDidMount() {
    this.props.fetchGoLives();
  }

  renderGoLives(golives) {
    const { avatarStyle, dateStyle } = styles;
    return golives.map((item, index) => {
      return (
        <div key={index}>
          <ListItem
            leftAvatar={
              <div style={avatarStyle}>
                <UserAvatar
                  size="48"
                  style={{ fontFamily: "Oswald", fontSize: "18px" }}
                  name={shortCustomerName(item.customername)}
                  color={getColor(index, colorAr)}
                  colors={["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#FFFF00", "#E57373"]}
                />
                <div style={dateStyle}>{getDay(item.date)}</div>
              </div>
            }
            primaryText={item.customername}
            secondaryText={<p>{item.comments}</p>}
            secondaryTextLines={2}
            rightAvatar={<div style={{ fontWeight: "bold" }}>{item.version}</div>}
          />
          <Divider inset={true} />
        </div>
      );
    });
  }

  render() {
    const { golives } = this.props;
    const { listStyle, subheaderStyle } = styles;
    if (!golives) {
      return <div>Loading</div>;
    }
    return (
      <List style={listStyle}>
        <Subheader style={subheaderStyle}>Go Lives</Subheader>
        <Divider inset={true} />
        {this.renderGoLives(golives)}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    golives: state.summary.golives
  };
};

export default connect(mapStateToProps, { fetchGoLives })(GoLiveList);
