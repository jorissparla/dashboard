import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ViewIcon from "@material-ui/icons/Pageview";
import ModeEdit from "@material-ui/icons/ModeEdit";
import NewIcon from "@material-ui/icons/NewReleases";

import "./my.css";

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const styles = theme => ({
  card: {
    maxWidth: 380,
    width: "345px",
    margin: "5px",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#b39ddb"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  expandOpenCard: {
    maxWidth: "800px",
    left: "20%",
    top: "20%",
    position: "absolute",
    zIndex: 101,
    backgroundColor: "#eee"
  },
  avatar: {
    backgroundColor: red[500]
  },
  textContent: {
    textShadow: "1px 1px 1px rgba(0,0,0, 0.1)"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  link: {
    color: "inherit",
    textDecoration: "inherit"
  },
  wide: {
    width: "150px",
    justifyContent: "center",
    textAlign: "center"
  }
});

class SupportCard extends React.Component {
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes } = this.props;
    const {
      title = "A Very Long Procedure Name",
      text = "Papier Und KartonFabrik",
      buttonText = "📂",
      category = "Cloud",
      link = "http://www.google.com",
      action = null,
      color = "#FFFFF",
      canEdit = true,
      editLink = "",
      viewLink = "",
      isNew = false,
      onAudit = () => console.log("onaudit"),
      onFollowLink = link => {
        console.log("onFollowLink");
        return link;
      }
    } = this.props;
    return (
      <Card
        className={classnames(classes.card, {
          [classes.expandOpenCard]: this.state.expanded
        })}
        style={{ backgroundColor: `${color}` }}
      >
        {/*    <CardMedia
          component="img"
          className="media"
          height="100"
          image="http://nlbavwixs.infor.com/images/categories/Cloud.png"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="title">
            {title}
          </Typography>
          {false && <Typography component="p">{text.slice(0, 100).concat("...")}</Typography>}
        </CardContent>
        <CardActions className={classes.actions}>
          {canEdit && (
            <IconButton onClick={e => window.alert("ja") && onAudit(editLink)}>
              <Link to={editLink} className={classes.link}>
                <ModeEdit />
              </Link>
            </IconButton>
          )}
          <Link to={viewLink} className={classes.link}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={e => onAudit(viewLink, "SupportCard")}
            >
              View
            </Button>
          </Link>
          <Typography variant="title" component="h3" className={classes.wide}>
            {category}
          </Typography>
          {false && (
            <Button size="small" color="secondary" variant="contained">
              Open
            </Button>
          )}
          <IconButton
            primary={true}
            target="_blank_"
            href={link}
            onClick={() => onFollowLink(viewLink, link)}
          >
            {buttonText}
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography className={classes.textContent} paragraph>
              {text}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const ALLCARDS = gql`
  {
    supportcards {
      id
      title
      description
      link
      created
      updatedAt
      category {
        name
        color
        backgroundcolor
      }
    }
  }
`;

const SmallCard = withStyles(styles)(SupportCard);

export default class MyCard extends React.Component {
  render() {
    return (
      <Outer>
        <Query query={ALLCARDS}>
          {({ data, loading }) => {
            if (loading) return "loading";
            console.log("Data", data);
            //return <div>x</div>;
            return data.supportcards.map(item => {
              const {
                title,
                description,
                id,
                link,
                category: { name, backgroundcolor }
              } = item;
              return (
                <SmallCard
                  title={title}
                  text={description}
                  category={name}
                  color={backgroundcolor}
                />
              );
            });
          }}
        </Query>
      </Outer>
    );
  }
}

export { SmallCard };