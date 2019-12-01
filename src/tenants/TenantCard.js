import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  Switch,
  Typography
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import classNames from "classnames";
import { UserContext } from "globalState/UserProvider";
import _ from "lodash";
import React from "react";
import { Mutation } from "react-apollo";
import { distanceInWordsToNow, format } from "../utils/format";
import EditTenantDetails from "./details/components/EditTenant";
import Label from "./details/components/Label";
import { MUTATION_MARK_LIVE } from "./TenantQueries";

export const TenantCard = ({
  classes,
  customer,
  customerid,
  tenants,
  tenantdetails,
  live,
  role = "Guest",
  onStatusChange = () => console.log("change"),
  infoClicked
}) => {
  const [isLive, setLive] = React.useState(live);
  const [isOpen, setisOpened] = React.useState(false);
  const userContext = React.useContext(UserContext);
  const { user, login, hasPermissions } = userContext;

  const isTenantEditor = hasPermissions(user, ["TENANTEDIT", "ADMIN"]);
  const isAdmin = hasPermissions(user, ["ADMIN"]);

  let tenantcustomerdetail;
  if (customer !== "Infor" && tenantdetails) {
    tenantcustomerdetail = tenantdetails;
  } else {
    tenantcustomerdetail = {
      id: "",
      customer: {
        name: ""
      },
      customerid: "",
      golivedate: "",
      golivecomments: "",
      csm: "",
      pm: "",
      info: "",
      temperature: "NORMAL"
    };
  }
  let golivedate = tenantcustomerdetail.golivedate;
  if (golivedate && golivedate !== "1568419200000" && golivedate !== "0") {
    golivedate = format(tenantcustomerdetail.golivedate, "MMM, DD, YYYY");
  } else golivedate = "Date is not known";
  const temp = tenantcustomerdetail.temperature;
  const max = _.maxBy(tenants, t => format(t.lastupdated, "YYYYMMDD")).lastupdated;
  const max2 = distanceInWordsToNow(max);
  if (customer === "Azteka Consulting GmbH") console.log(customer, { isLive }, live);
  const avaclass = classNames({
    [classes.alert]: temp === "ALERT" ? true : false,
    [classes.watch]: temp === "WATCH" ? true : false,
    [classes.live]: live,
    [classes.notlive]: !live
  });

  const indexObj = {
    PRD: 1,
    TRN: 2,
    TST: 3,
    DEV: 4,
    DEM: 5
  };
  const tags = tenants
    .map(t => {
      const postfix = t.name.split("_")[1];
      const index = indexObj[postfix] || 999;
      return { index, ...t };
    })
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  const baseTenantId = tenants && tenants.length && tenants.length > 0 ? tenants[0].name.split("_")[0] : "";
  // console.log(customer, tenants[0]);
  return (
    <>
      <Card className={customer === "Infor" ? classes.card2 : classes.card}>
        <CardContent>
          {/* <Header>
          <H2>{customer}</H2>

          <FavoriteBadge isVisible={live}>Live</FavoriteBadge>
        </Header> */}
          <CardHeader
            className={classes.header}
            avatar={
              // <Avatar className={live ? classes.live : classes.notlive} alt="Author">
              <Avatar className={avaclass} alt="Author" title={temp}>
                {live ? "Live" : ""}
              </Avatar>
            }
            title={customer}
            disableTypography
            subheader={<Typography variant="body2">Updated {max2} ago</Typography>}
          />
          <Typography className={classes.pos} color="textSecondary">
            {tenants.length > 0 && tenants[0].farm}
            <span className={classes.box}>{baseTenantId}</span>
          </Typography>
          <div className={classes.description}>
            <Typography color="textSecondary" variant="subtitle2">
              {tenantcustomerdetail.golivecomments.trim() ? (
                tenantcustomerdetail.golivecomments
              ) : (
                <span className={classes.descriptionblank}>Customer Information will be shown here</span>
              )}
            </Typography>
          </div>
          <div className={classes.tags}>
            {tags.map(({ id, name, version }) => {
              let shortname = "";
              if (customer === "Infor") {
                shortname = name;
              } else shortname = name.split("_")[1];
              const color = shortname.endsWith("PRD")
                ? "rgba(46, 202, 19, 1)"
                : shortname.endsWith("TRN")
                ? "#1da1f2"
                : "rgba(0,0,0,0.5)";
              return <Label key={id} color={color}>{`${shortname}:${version}`}</Label>;
            })}
          </div>
          <Divider />
          <Grid alignItems="center" container justify="space-between" spacing={3}>
            <Grid item className={classes.csm}>
              <Typography variant="h5">PM</Typography>
              <Typography variant="body2">
                {tenantcustomerdetail.pm ? tenantcustomerdetail.pm : "PM not entered"}
              </Typography>
            </Grid>
            <Grid item className={classes.csm}>
              <Typography variant="h5">CSM</Typography>
              <Typography variant="body2">
                {" "}
                {tenantcustomerdetail.csm ? tenantcustomerdetail.csm : "CSM not entered"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Go Live Date</Typography>
              <Typography variant="body2">{golivedate}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.spaceFooter}>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              window.open(
                "http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=" + tenants[0].customerid
              )
            }
          >
            <ListIcon className={classes.filterButton} />
            Incidents
          </Button>
          {isTenantEditor && (
            <Button variant="outlined" color="primary" onClick={() => setisOpened(true)}>
              Edit
            </Button>
          )}
          {isAdmin && (
            <Mutation mutation={MUTATION_MARK_LIVE}>
              {mutate => (
                <Switch
                  checked={live}
                  onChange={() => {
                    // console.log("change" + tenants[0].customerid);
                    setLive(prev => {
                      const input = { live: 1 - prev, number: tenants[0].customerid };
                      // console.log(input);
                      mutate({ variables: { input } });
                      onStatusChange();
                      return prev === 1 ? false : true;
                    });
                  }}
                  value="checkedB"
                  color="secondary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              )}
            </Mutation>
          )}
        </CardActions>
      </Card>
      <Modal
        onClose={() => setisOpened(false)}
        open={isOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <EditTenantDetails profile={tenantcustomerdetail} onClose={() => setisOpened(false)} />
        {/* </Grid> */}
      </Modal>
    </>
  );
};
