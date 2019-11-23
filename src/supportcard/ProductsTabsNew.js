import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { Block } from '../elements/Block';
import { usePersistentState } from 'hooks';
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

export const ProductsTab = ({ onChange, onSave }) => {
  const [selected, setSelected] = usePersistentState('supp_card_product', 'LN');

  const products = ['LN', 'XPERT', 'INFOROS'];

  const handleSelection = name => {
    if (selected === name) {
      setSelected(prev => '');
      // onChange('');
    } else setSelected(name);
    // onChange(name);
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
      <BrowseTitle>Product</BrowseTitle>
      <List>
        {products.map(product => {
          return (
            <li className="li" key={product}>
              <Block selected={product === selected} onClick={() => handleSelection(product)}>
                {product}
              </Block>
            </li>
          );
        })}
      </List>
    </div>
  );
};
