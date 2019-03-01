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

const SELECTEDCOLOR = 'rgb(130, 216, 216)';

const Block = styled('a')<{ selected?: boolean }>`
  color: ${props => (props.selected ? 'black' : 'rgb(69, 69, 69)')};
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => (props.selected ? SELECTEDCOLOR : 'rgb(196, 196, 196)')};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  transition: all 0.3s ease 0s;
  :hover {
    background-color: ${SELECTEDCOLOR};
    color: black;
    cursor: pointer;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 0px 2rem;
  padding: 0px;
  list-style: none;
`;

const BrowseTitle = styled.h5`
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1.2rem;
`;

const videoFragment = gql`
  fragment VideoDetails on Video {
    id
    title
    date
    url
    category
    views
  }
`;

const QUERY_ALL_VIDEOS = gql`
  ${videoFragment}
  query QUERY_ALL_VIDEOS {
    videos {
      ...VideoDetails
    }
  }
`;

const MUTATION_UPDATE_VIEW = gql`
  ${videoFragment}
  mutation MUTATION_UPDATE_VIEWS($id: ID!) {
    increasevideonumberofviews(id: $id) {
      ...VideoDetails
    }
  }
`;

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

interface Props {
  isSelected: string;
  setSelected: Function;
}

const CategoryBar: React.FC<Props> = ({ isSelected, setSelected }) => {
  const categories = ['Dashboard Instruction', 'Technical', 'Development', 'Other'];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignContent: 'flex-start',
        width: '20%'
      }}
    >
      <BrowseTitle>Browse by Topic</BrowseTitle>
      <List>
        {categories.map(category => (
          <li className="li" key={category}>
            <Block selected={category === isSelected} onClick={() => setSelected(category)}>
              {category}
            </Block>
          </li>
        ))}
      </List>
    </div>
  );
};

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
  const [isSelected, setSelected] = useState('Dashboard Instruction');

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
