import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
const StyledInitials = styled.div`
  color: pink;
  background-color: white;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  border-color: pink;
  border: 2px solid pink;
  height: 40px;
  width: 40px;
  margin: 5px;
`;

const Image = ({ image, fullname }) => {
  const initials = fullname
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
  if (image) {
    return <Avatar src={image} style={{ margin: 5 }} />;
  } else {
    return <StyledInitials>{initials}</StyledInitials>;
  }
};

class AnniversaryList extends React.Component {
  state = {};
  renderAnniversaries = anniversaries => {
    return anniversaries.map(anniversary => (
      <Card key={anniversary.id} expanded={true} style={{ display: "flex", margin: 20 }}>
        <CardHeader
          title={anniversary.fullname}
          subtitle={`${anniversary.years} Years`}
          avatar={<Image image={anniversary.account.image} fullname={anniversary.fullname} />}
        />} />
        <CardActions>
          <FlatButton label={anniversary.anniversarydate} />
        </CardActions>
      </Card>
    ));
  };
  render() {
    const { loading, anniversaries } = this.props.data;
    if (loading) {
      return <div>Loading....</div>;
    }
    console.log(anniversaries);
    return (
      <div style={{ display: "flex", margin: 20, flexWrap: "wrap" }}>
        {this.renderAnniversaries(anniversaries)}
      </div>
    );
  }
}

const anniversaryQuery = gql`
  query anniversaryQuery {
    anniversaries {
      anniversarydate
      dateofhire
      fullname
      years
      id
      account {
        id
        lastname
        image
      }
    }
  }
`;

export default graphql(anniversaryQuery, { name: "data" })(AnniversaryList);
