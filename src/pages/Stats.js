import { makeStyles } from "@material-ui/core/styles";
import { request } from "graphql-request";
import { usePersistentState } from "hooks";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { SelectionForm } from "../stats/NewSelectionForm";
import { QUERY_BACKLOG_TEXT } from "../stats/queries/BACKLOG_QUERY2";
import { format } from "../utils/format";
import { UserContext } from "./../globalState/UserProvider";
import NiceSpinner from "./../utils/NiceSpinner";
import { StatsMain, useParams } from "./StatsMain";
const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    top: "200px",
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18,
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: "white",
  },
  tableheadernarrow: {
    fontFamily: "Poppins",
    fontSize: 18,
    width: 20,
  },
  narrow: {
    width: 20,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 15,
    padding: 10,
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
  },
  textfield: {
    verticalAlign: "center",
    margin: 10,
  },
  button: {
    margin: 10,
  },
  spaceapart: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
    margin: 2,
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  row: {
    fontFamily: "Poppins",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export const PRODUCT_LIST = ["LN", "PLM", "Protean", "InforOS", "Xpert", "Swan", "AutoConnect", "AutoRelease", "SupplyWeb", "TRANS4M"];
export const REGION_LIST = ["APJ", "EMEA", "NA", "LA"];
export const REGION_LIST_2 = [
  {
    value: "APJ",
    title: "APJ",
  },
  {
    value: "EMEA",
    title: "EMEA",
  },
  {
    value: "LA",
    title: "LA",
  },
  {
    value: "NA",
    title: "NA",
  },
  {
    value: "All",
    title: "ALL REGIONS",
  },
];

const Stats = (props) => {
  const { user } = React.useContext(UserContext);
  const [date] = useState(format(Date.now(), "yyyy-MM-dd"));
  const classes = useStyles();

  // console.log('rendering data');
  let enableIt = false;
  const isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  if (user && user.permissions) {
    enableIt = user.permissions.some(({ permission }) => permission === "STATS");
  }
  console.log("Start:", new Date());
  const parms = useParams(!isValidSuperUser && !enableIt);
  const API = "https://nlbavwixs.infor.com:4001";
  const { data, error } = useSWR(
    QUERY_BACKLOG_TEXT,

    (query) =>
      request(API, query, {
        date,
        owner: "",
        products: PRODUCT_LIST,
        deployment: "ALL",
        ...parms,
      }),
    { refreshInterval: 200000 }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <NiceSpinner />;
  console.log(data);

  // return <div>Hallo</div>;
  {
    const owner = user ? (user.fullname ? user.fullname : "") : "";
    // console.log(owner, data);
    return <StatsPage data={data} classes={classes} isValidSuperUser={isValidSuperUser || enableIt} owner={owner} />;
  }
};

const StatsPage = ({ data, classes, owner, isValidSuperUser }) => {
  const history = useHistory();
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  const [selectedProducts] = usePersistentState("selectedproducts", ["LN"]);
  const [region] = usePersistentState("region", "EMEA");
  const [filterValues, setFilterValues] = useState({
    owner,
    products: selectedProducts,
    region,
  });
  function handleChange(values) {
    setFilterValues(values);
  }
  return (
    <div className="font-sans text-lg  bg-gray-200 min-h-screen flex items-center mb-10 px-2 flex-col w-full">
      <SelectionForm
        classes={classes}
        isValidSuperUser={isValidSuperUser}
        onChange={handleChange}
        onNavigateToParams={() => history.push("/myworkparams")}
        initialValue={{
          owner,
          lastUpdated: mostRecentUpdate,
          actionNeeded: true,
        }}
        accounts={data.accounts}
      />

      <StatsMain data={data} classes={classes} owner={owner} filterValues={filterValues} />
    </div>
  );
};

export default Stats;
