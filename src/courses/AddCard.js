import React from 'react';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ContentAdd from '@material-ui/icons/Add';
//import { Card, CardTitle, CardText } from "material-ui/Card";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  :hover {
    background: #0196f3;
    color: white;
  }
`;

const AddCard = ({
  link = 'courses/create',
  title = 'Add  Course',
  color = { blue },
  background = 'papayawhip',
  classes,
  history
}) => {
  return (
    <Card style={{ width: '22%', margin: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Title>{title}</Title>
        </Typography>
        <CardActionArea>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
            onClick={() => history.push(link)}
          >
            <AddIcon />
          </Button>
        </CardActionArea>
      </CardContent>
    </Card>
  );
};
export default withStyles(styles)(withRouter(AddCard));
