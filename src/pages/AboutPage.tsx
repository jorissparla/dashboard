import React, { useEffect, Suspense, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import red from '@material-ui/core/colors/red';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { format } from '../utils/format';
import SearchBar from '../common/SearchBar';

const QUERY_ALL_VIDEOS = gql`
  query QUERY_ALL_VIDEOS {
    videos {
      id
      title
      date
      url
    }
  }
`;

const styles: any = (theme: any) => ({
  card: {
    maxWidth: 400,
    margin: 10,
    maxHeight: 400,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  main: {
    backgroundColor: '#efefef'
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

type videoTYpe = {
  id: string;
  title: string;
  date: string;
  url: string;
};

function AboutPageContainer(props: any) {
  const { loading, data } = useQuery(QUERY_ALL_VIDEOS, { suspend: false });

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
  const videos: videoTYpe[] = data.videos;
  return <AboutPage videos={videos} classes={props.classes} />;
}

function AboutPage(props: any) {
  const classes = props.classes;
  const videos: videoTYpe[] = props.videos;
  const [searchText, setSearchText] = useState('');

  const filteredVideos = videos.filter(({ title }) =>
    _.includes(title.toUpperCase(), searchText.toUpperCase())
  );
  return (
    <div className={classes.main}>
      <SearchBar
        onChange={(v: string) => setSearchText(v)}
        searchOnEnter={true}
        hintText="Type searchterm and press enter..."
      />
      <div className={classes.container}>
        {filteredVideos.map(({ id, title, date, url }) => {
          const formatteddate = format(date, 'MMMM, DD, YYYY');
          return (
            <Card className={classes.card} key={id}>
              <CardHeader
                titleTypographyProps={{ component: 'h2' }}
                title={title}
                subheader={formatteddate}
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {title.slice(0, 1).toUpperCase()}
                  </Avatar>
                }
              />
              <video width="100%" height="300" controls className={classes.video}>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(AboutPageContainer);
