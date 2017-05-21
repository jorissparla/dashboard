import { gql, graphql } from "react-apollo";
import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import { Tabs, Tab } from "material-ui/Tabs";
import FontIcon from "material-ui/FontIcon";
import { compose, withState, withHandlers } from "recompose";
import MapsPersonPin from "material-ui/svg-icons/maps/person-pin";
import ProblemPin from "material-ui/svg-icons/action/report-problem";
import CloudPin from "material-ui/svg-icons/file/cloud";
import ICSPin from "material-ui/svg-icons/maps/local-laundry-service";
import DeveloperPin from "material-ui/svg-icons/device/developer-mode";
import ReprodPin from "material-ui/svg-icons/action/build";
import SatPin from "material-ui/svg-icons/action/thumb-up";
import AllPin from "material-ui/svg-icons/communication/clear-all";
import {
  blue500,
  orange800,
  deepPurple500,
  deepOrange500,
  grey900
} from "material-ui/styles/colors";

const style = {
  backgroundColor: "dodgerblue"
};

const IconMapper = label => {
  switch (label) {
    case "Cloud":
      return <CloudPin />;
      break;
    case "Development":
      return <DeveloperPin />;
      break;
    case "Reproduction":
      return <ReprodPin />;
      break;
    case "CustomerSat":
      return <SatPin />;
      break;

    default:
      return <div />;
      break;
  }
};

const CategoryTabs = ({
  data: { loading, error, categories },
  onChange,
  onSave
}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Tabs
      style={style}
      contentContainerStyle={style}
      tabItemContainerStyle={style}
    >
      <Tab
        key="2ddgdfgdgt534"
        label="All"
        icon={<AllPin />}
        onActive={() => onChange("")}
      />
      {categories.map(({ id, name }) => (
        <Tab
          key={id}
          label={name}
          icon={IconMapper(name)}
          onActive={({ props: { label } }) => onChange(label)}
        />
      ))}
    </Tabs>
  );
};

const CategoryQuery = gql`
  query CategoryQuery {
    categories {
      id
      name
    }
  }
`;
export default graphql(CategoryQuery)(CategoryTabs);
