import React, { useEffect, Suspense, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import _ from 'lodash';
import red from '@material-ui/core/colors/red';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import { format } from '../utils/format';
import SearchBar from '../common/SearchBar';
import { CategoryBar } from '../videos/CategoryList';
import { QUERY_ALL_VIDEOS, MUTATION_UPDATE_VIEW } from '../videos/Queries';

const styles: any = (theme: any) => ({
  card: {
    maxWidth: 300,
    margin: 10,
    maxHeight: 300,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  main: {
    backgroundColor: '#efefef',
    width: '100%'
  },
  container: {
    display: 'flex',
    margin: 20,
    flexWrap: 'wrap',
    backgroundColor: '#efefef',
    height: '100vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  video: {
    border: '1px solid #cccccc'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

type videoType = {
  id: string;
  title: string;
  date: string;
  url: string;
  category: string;
  views: number;
};

function AboutPageContainer(props: any) {
  const { loading, data } = useQuery(QUERY_ALL_VIDEOS, {
    suspend: false
  });
  const updateViews = useMutation(MUTATION_UPDATE_VIEW);
  useEffect(() => {
    document.title = 'Support DashBoard Instruction Videos';
    return () => {
      document.title = 'Support Dashboard';
    };
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.videos)) {
    return <div>Error</div>;
  }
  const videos: videoType[] = data.videos;
  return (
    <AboutPage
      videos={videos}
      classes={props.classes}
      onView={(id: string) => updateViews({ variables: { id } })}
    />
  );
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function AboutPage(props: any) {
  const classes = props.classes;
  const videos: videoType[] = props.videos;
  const [searchText, setSearchText] = useState('');
  const [isSelected, setSelected] = useState('Dashboard Instruction'.toUpperCase());

  const filteredVideos = videos.filter(
    ({ title, category }) =>
      _.includes(title.toUpperCase(), searchText.toUpperCase()) &&
      _.includes(category.toUpperCase(), isSelected.toUpperCase())
  );
  return (
    <div style={{ display: 'flex' }}>
      <CategoryBar isSelected={isSelected} setSelected={setSelected} />
      <div className={classes.main}>
        <SearchBar
          onChange={(v: string) => setSearchText(v)}
          searchOnEnter={true}
          hintText="Type searchterm and press enter..."
        />
        <div className={classes.container}>
          {filteredVideos.length === 0 ? (
            <h2>No Videos selected</h2>
          ) : (
            filteredVideos.map(({ id, title, date, url, views }) => {
              const formatteddate = format(date, 'MMMM, DD, YYYY');
              return (
                <Card className={classes.card} key={id}>
                  <CardHeader
                    titleTypographyProps={{ component: 'h2' }}
                    title={title}
                    subheader={formatteddate}
                    avatar={
                      <Badge className={classes.margin} badgeContent={views} color="primary">
                        <Avatar
                          aria-label="Recipe"
                          className={classes.avatar}
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          {title.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Badge>
                    }
                  />
                  <video
                    width="100%"
                    height="200"
                    controls
                    className={classes.video}
                    onPlay={() => props.onView(id)}
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(AboutPageContainer);
