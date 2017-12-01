import { gql, graphql } from "react-apollo";
import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import CloudPin from "material-ui/svg-icons/file/cloud";
import DeveloperPin from "material-ui/svg-icons/device/developer-mode";
import ReprodPin from "material-ui/svg-icons/action/build";
import SatPin from "material-ui/svg-icons/action/thumb-up";
import AllPin from "material-ui/svg-icons/communication/clear-all";
import "material-ui/styles/colors";

const style = {
  backgroundColor: "dodgerblue"
};

const IconMapper = label => {
  switch (label) {
    case "Cloud":
      return <CloudPin />;
    case "Development":
      return <DeveloperPin />;
    case "Reproduction":
      return <ReprodPin />;
    case "CustomerSat":
      return <SatPin />;

    default:
      return <div />;
  }
};

const CategoryTabs = ({ data: { loading, error, categories }, onChange, onSave }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    /*     <Tabs
      style={style}
      contentContainerStyle={style}
      tabItemContainerStyle={style}
    > */
    <Tabs>
      <Tab key="2ddgdfgdgt534" label="All" icon={<AllPin />} onActive={() => onChange("")} />
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
