import React from "react";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ContentAdd from "@material-ui/icons/Add";
//import { Card, CardTitle, CardText } from "material-ui/Card";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.div`
  font-family: Roboto;
  font-size: 2rem;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  :hover {
    background: #0196f3;
    color: white;
  }
`;

export default ({
  link = "courses/create",
  title = "Add a new Course",
  color = { blue },
  background = "papayawhip"
}) => {
  return (
    <Card style={{ width: "22%", margin: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Title>{title}</Title>
        </Typography>
        <CardActionArea>
          <StyledLink to={link || "/"}>
            <Button variant="fab" color="primary" aria-label="Add">
              <AddIcon />
            </Button>
          </StyledLink>
        </CardActionArea>
      </CardContent>
    </Card>
  );
};
