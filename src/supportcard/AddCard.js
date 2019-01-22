import React from 'react';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit,
    alignContent: 'center',
    display: 'flex'
  },

  buttonDel: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
    <StyledContainer>
      <StyledLink onClick={onClick} to={link || '/'}>
        <div className={classes.center}>
          <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
          </Button>
          <Title>{title}</Title>
        </div>
      </StyledLink>
    </StyledContainer>
  );
};
export default withStyles(styles)(AddCard);
