import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { Block, BlockButton } from '../elements/Block';
import { Button } from '@material-ui/core';
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

const CategoryQuery = gql`
  query CategoryQuery {
    categories {
      id
      name
    }
  }
`;

export const CategoryTabsNew = ({ onChange, onSave }) => {
  const { data, loading } = useQuery(CategoryQuery);
  const [selected, setSelected] = useState('');

  if (loading) return <div />;
  const categories = data.categories || [];

  let selectedArray = selected.split(':');

  const handleSelection = name => {
    const selIndex = selectedArray.indexOf(name);
    if (selIndex >= 0) {
      selectedArray = selectedArray.filter(arEl => arEl !== name);
    } else {
      selectedArray = [...selectedArray, name];
    }
    setSelected(selectedArray.join(':'));
    onChange(selectedArray.join(':'));
  };
  const clearSelection = () => {
    setSelected('');
    selectedArray = [];
    onChange('');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        margin: '0 10px 0 px'
      }}
    >
      <BrowseTitle>Categories</BrowseTitle>
      <List>
        {categories.map(category => {
          const { id, name } = category;
          return (
            <li className="li" key={id}>
              <Block
                selected={selectedArray.indexOf(name) >= 0}
                onClick={() => handleSelection(name)}
              >
                {name}
              </Block>
            </li>
          );
        })}
        <BlockButton onClick={clearSelection}>Clear</BlockButton>
      </List>
    </div>
  );
};
