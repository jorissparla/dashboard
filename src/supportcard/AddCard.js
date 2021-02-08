import { Fab } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  round: {
    borderRadius: "14px",
  },
  button: {
    margin: theme.spacing(1),
    alignContent: "center",
    display: "flex",
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: "#000",
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: "100%",
  },
  center: {
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
  },
});

const Title = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  :hover {
    border: 2px solid lightgrey;
    border-radius: 2px;
  }
`;

const AddCard = ({ link = "courses/create", title = "Add  Course", color = blue, background = "papayawhip", onClick, classes }) => {
  return (
    <div className="w-full max-w-sm ">
      <div className="rounded-lg  m-3  shadow-lg bg-white h-48 flex items-center justify-center">
        <StyledLink onClick={onClick} to={link || "/"}>
          <div className={classes.center}>
            <Fab color="primary" aria-label="Add" className={classes.button}>
              <AddIcon />
            </Fab>
            <Title>{title}</Title>
          </div>
        </StyledLink>
      </div>
    </div>
  );
};
export default withStyles(styles)(AddCard);
