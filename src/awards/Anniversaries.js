import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import format from "date-fns/format";
import { WideTitle, StyledInitials } from "../styles";

const P = styled.p`
  font-family: Raleway;
  font-size: 24px;
`;

const Y = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: 900;
  color: black;
  margin-right: 5px;
`;
const DIV = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = ({ image, fullname }) => {
  const initials = fullname
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
  if (image) {
    return <Avatar src={image} style={{ margin: 5 }} size={80} />;
  } else {
    return <StyledInitials>{initials}</StyledInitials>;
  }
};

class AnniversaryList extends React.Component {
  state = {};
  yearsColor = years => {
    switch (years) {
      case 5:
        return "#FF8A65";
        break;

      case 10:
        return "#B3E5FC";
        break;

      case 15:
        return "#4DB6AC";
        break;

      case 20:
        return "white";
        break;

      case 25:
        return "#FFC107";
        break;

      case 30:
        return "#CE93D8";
        break;

      default:
        return "white";
        break;
    }
  };

  renderAnniversaries = (anniversaries = []) => {
    return anniversaries.map(anniversary => (
      <Card
        key={anniversary.id}
        expanded={true}
        style={{
          display: "flex",
          margin: 20,
          width: "22%",
          backgroundColor: this.yearsColor(anniversary.years)
        }}
      >
        <CardHeader
          title={<P>{anniversary.fullname}</P>}
          subtitle={
            <DIV>
              <Y>{anniversary.years}</Y> Years
            </DIV>
          }
          avatar={<Image image={anniversary.account.image} fullname={anniversary.fullname} />}
        />} />
        <CardActions>
          <FlatButton label={format(anniversary.anniversarydate, "ddd, DD MMMM YYYY")} />
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
      <div>
        <WideTitle>Anniversaries</WideTitle>

        <div style={{ display: "flex", margin: 20, flexWrap: "wrap" }}>
          {this.renderAnniversaries(anniversaries)}
        </div>
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
