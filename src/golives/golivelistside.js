import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
//import { format } from 'date-fns';
import { format } from '../utils/format';
import Spinner from '../utils/spinner';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const getDay = date =>
  format(date, 'MMM')
    .toUpperCase()
    .substr(0, 3) + format(date, 'DD');

const GoLiveListStyle = styled.div`
  margin-right: 10px;
`;

const GoLiveItemStyle = styled.div`
  background-color: ${props => props['background-color'] && props['background-color']};

  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const GoLiveCustomerStyle = styled.div`
  color: darkblue;
  font-family: Roboto;
  font-size: 16px;
`;

const H5Styled = styled.h3`
  font-family: Oswald;
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
  },
  headerStyle: {
    fontSize: 18,
    width: 200
  },
  dateStyle: {
    color: '#000',
    fontFamily: 'Oswald',
    fontWeight: 500,
    fontSize: 18,
    justifyContent: 'center'
  }
});

class GoLiveListSide extends Component {
  renderItems = items => {
    const { classes } = this.props;
    if (!items) return <div>loading</div>;
    return items.map((item, index) => {
      const key = item.customerid + '-' + item.version;

      let color = index % 2 ? 'blanchedalmond' : 'white';
      return (
        <GoLiveItemStyle background-color={color} key={index + key}>
          <ListItem>
            <ListItemIcon className={classes.dateStyle}>{getDay(item.date)}</ListItemIcon>
            <ListItemText
              /* leftAvatar={<GoLiveDateStyle>*/
              primary={
                <div>
                  <GoLiveCustomerStyle>{item.customername}</GoLiveCustomerStyle>{' '}
                </div>
              }
              //secondaryText= {item.version}
            />
          </ListItem>
          <Divider />
        </GoLiveItemStyle>
      );
    });
  };

  render() {
    //const { golives } = this.props;
    const {
      data: { loading, golives }
    } = this.props;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    if (!golives || golives === null) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <GoLiveListStyle>
        <H5Styled>Upcoming Go Lives</H5Styled>
        <List style={{ backgroundColor: 'white' }}>
          <Divider />
          {this.renderItems(golives)}
        </List>
      </GoLiveListStyle>
    );
  }
}

const queryGoLives = gql`
  query golives {
    golives {
      id
      customername
      customerid
      country
      region
      version
      comments
      date
    }
  }
`;

export default graphql(queryGoLives)(withStyles(styles)(GoLiveListSide));
