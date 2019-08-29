import { Fab } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  round: {
    borderRadius: '14px'
  },
  button: {
    margin: theme.spacing(1),
    alignContent: 'center',
    display: 'flex'
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: '100%'
  },
  center: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
});

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1 px solid blue;
  padding: 10px;
  width: 17%;
  height: 200px;
  margin: 5px;
  background-color: ${props => props.background};
  border-radius: 14px;
`;

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

const AddCard = ({
  link = 'courses/create',
  title = 'Add  Course',
  color = blue,
  background = 'papayawhip',
  onClick,
  classes
}) => {
  return (
    <StyledContainer className={classes.round}>
      <StyledLink onClick={onClick} to={link || '/'}>
        <div className={classes.center}>
          <Fab color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
          </Fab>
          <Title>{title}</Title>
        </div>
      </StyledLink>
    </StyledContainer>
  );
};
export default withStyles(styles)(AddCard);
