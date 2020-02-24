import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo";
import { CardSection } from "../common";
//import { format } from 'date-fns';
import { format } from "../utils/format";
const QUERY_NEWSITEMS = gql`
  query QUERY_NEWSITEMS {
    news {
      id
      title
      body
      create_date
      img
    }
  }
`;

const styles = theme => ({
  root: {
    display: "flex",
    margin: 30,
    flexWrap: "wrap"
  },
  card: {
    maxWidth: 345,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.5s ease all",
    "&:hover": {
      transform: "rotateZ(-5deg)",
      maxWidth: 400
    }
  },
  media: {
    height: 380,
    objectFit: "cover",
    display: "flex",
    flexDirection: "column-reverse"
  },
  title: {
    color: "white",
    justifyContent: "flex-end",
    fontWeight: 500,
    padding: 10,
    fontSize: 24,
    background: "#00000099"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  }
});

function MediaNewsCard({ news: { title, body, img, create_date }, classes }) {
  const newImage = img.replace("http:", "https:");
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={newImage} title={title}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography component="p">{body}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" variant="outlined">
          {format(create_date, "EEEE, dd MMMM yyyy")}
        </Button>
      </CardActions>
    </Card>
  );
}

const NewsPage = props => {
  const { classes } = props;
  const { loading, data } = useQuery(QUERY_NEWSITEMS);
  if (loading) {
    return "loading...";
  }
  if (!data || !data.news) {
    return "Cannot connect to server, please contact the administrator";
  }
  const { news } = data;
  return (
    <>
      {" "}
      <CardSection>
        <Typography variant="h4" gutterBottom>
          #ProudToWorkInSupport
        </Typography>
      </CardSection>
      <div className={classes.root}>
        {news.map(item => (
          <MediaNewsCard news={item} key={item.id} classes={classes} />
        ))}
      </div>
    </>
  );
};

export default withStyles(styles)(NewsPage);
