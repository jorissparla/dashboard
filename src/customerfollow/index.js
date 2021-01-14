import { Button, Card, CardContent, CardHeader, Divider, Grid, Input, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import ReactDOM from "react-dom";
import TimeLine from "./components/TimeLineLoaded";
import events from "./events";
import { ALL_FOLLOWED_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.05)",
    height: "100vh",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRight: "1px solid lightgrey",
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  keywords: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(2),
  },
  border: {
    borderRight: "1px solid black",
  },
  inline: {
    display: "inline",
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2),
  },
  details: {
    padding: theme.spacing(1, 3),
  },
  card: {
    marginLeft: theme.spacing(1),
    width: "70%",
  },
}));

const customers = [
  { name: "BAE systems", followed: "Ricardo", number: "12345" },
  { name: "Elbit", followed: "Massimo", number: "12345" },
  { name: "Motip Dupli", followed: "Joris", number: "12345" },
  { name: "Nedschroef", followed: "Maribel", number: "12345" },
  { name: "Elbit", followed: "Massimo", number: "12345" },
  { name: "Motip Dupli", followed: "Joris", number: "12345" },
  { name: "Nedschroef", followed: "Maribel", number: "12345" },
  { name: "Elbit", followed: "Massimo", number: "12345" },
  { name: "Motip Dupli", followed: "Joris", number: "12345" },
  { name: "Nedschroef", followed: "Maribel", number: "12345" },
];

function CustomerFollow() {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);

  const { data, loading } = useQuery(ALL_FOLLOWED_QUERY);
  async function loadData() {
    if (data && data.customers) {
      setCustomers(data.customers);
    }
  }

  React.useEffect(() => {
    loadData();
    console.log(loading);
  }, [loading]);

  const handleInputChange = (event) => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = (event) => {
    event.persist();
  };
  const filteredCustomers = customers.filter((c) => c.name.toUpperCase().startsWith(inputValue.toUpperCase()));

  const selectItem = (item) => setSelectedCustomer(item);
  if (loading) return <Spinner />;
  return (
    <div className={classes.App}>
      <h1>Critical customers</h1>
      <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={4} justify="flex-start">
          <List className={classes.root}>
            <ListItem>
              <div className={classes.keywords}>
                <SearchIcon className={classes.searchIcon} />
                <Input disableUnderline onChange={handleInputChange} onKeyUp={handleInputKeyup} placeholder="Enter a customer" value={inputValue} />
              </div>
            </ListItem>
            <Divider />
            {filteredCustomers.map((c) => (
              <div key={c.id}>
                <ListItem alignItems="flex-start" onClick={() => selectItem(c)} key={c.id}>
                  <ListItemText
                    primary={c.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                          followed by {c.followedBy}
                        </Typography>
                        {" — "}
                        {c.number}{" "}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Grid>
        <Grid xs={8} direction="column" spacing={3} justify="flex-start" container>
          {selectedCustomer ? (
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  title={selectedCustomer.name}
                  subheader={<Typography variant="body2">by {selectedCustomer.followed} at Updated: 21 September 2019</Typography>}
                  className={classes.header}
                  disableTypography
                />
                <CardContent>
                  Some text goes here
                  <Divider />
                  <div className={classes.details}>
                    <Grid alignItems="center" container justify="space-between" spacing={3}>
                      <Grid item>
                        <Typography variant="h5">25</Typography>
                        <Typography variant="body2">Open Incidents</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">11</Typography>
                        <Typography variant="body2">Support Backlog</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">1</Typography>
                        <Typography variant="body2">escalated</Typography>
                      </Grid>
                      <Grid item sm={12} justify="flex-start" container>
                        <Button
                          color="primary"
                          variant="outlined"
                          className={classes.learnMoreButton}
                          // size="small"
                          to="/projects/1/overview"
                        >
                          Incidents
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            "No customer selected"
          )}
          <Grid item>
            <TimeLine events={events} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomerFollow;
