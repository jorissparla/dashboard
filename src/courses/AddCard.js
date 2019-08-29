import { Fab } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: 320,
    margin: 10
  },

  media: {
    height: 120,
    objectFit: 'cover',
    minWidth: 300
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
const Title = styled.div`
  font-family: Roboto;
  font-size: 2rem;
  font-weight: 800;
  padding: 2px;
  color: #2196f3;
  text-align: center;
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
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Title>{title}</Title>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={() => history.push(link)}
      >
        <AddIcon />
      </Fab>
    </Card>
  );
};
export default withStyles(styles)(withRouter(AddCard));
