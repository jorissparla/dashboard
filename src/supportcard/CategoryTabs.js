import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloudPin from '@material-ui/icons/Cloud';
import DeveloperPin from '@material-ui/icons/DeveloperMode';
import ReprodPin from '@material-ui/icons/Build';
import SatPin from '@material-ui/icons/ThumbUp';
import AllPin from '@material-ui/icons/ClearAll';
import FlagIcon from '@material-ui/icons/Flag';

const IconMapper = label => {
  switch (label) {
    case 'Cloud':
      return <CloudPin />;
    case 'Development':
      return <DeveloperPin />;
    case 'Reproduction':
      return <ReprodPin />;
    case 'Localizations':
      return <FlagIcon />;
    case 'CustomerSat':
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
    <Tabs value="All" onChange={(e, v) => onChange(v)}>
      <Tab key="2ddgdfgdgt534" label="All" value="All" icon={<AllPin />} />
      {categories.map(({ id, name }) => (
        <Tab key={id} label={name} value={name} icon={IconMapper(name)} />
      ))}
    </Tabs>
  );
};

const CategoryQuery = gql`
  query allCategories {
    categories {
      id
      name
    }
  }
`;
export default graphql(CategoryQuery)(CategoryTabs);
