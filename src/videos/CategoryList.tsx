import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

const SELECTEDCOLOR = 'rgb(130, 216, 216)';
const HOVERCOLOR = '#524763)';

const Block = styled('a')<{ selected?: boolean }>`
  font-family: Poppins;
  color: ${props => (props.selected ? 'black' : 'rgb(69, 69, 69)')};
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${props => (props.selected ? SELECTEDCOLOR : 'rgb(196, 196, 196)')};
  border-radius: 3px;
  padding: 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  transition: all 0.2s ease 0s;
  :hover {
    background-color: ${HOVERCOLOR};
    color: black;
    cursor: pointer;
  }
`;

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

const QUERY_VIDEO_CATEGORIES = gql`
  {
    videocategories {
      id
      name
      sequence
    }
  }
`;

interface Props {
  isSelected: string;
  setSelected: Function;
}

type CategoryType = {
  id: string;
  name: string;
  sequence: number;
};
export const CategoryBar: React.FC<Props> = ({ isSelected, setSelected }) => {
  //const categories = ['Dashboard Instruction', 'Technical', 'Development', 'Other'];
  const { loading, data } = useQuery(QUERY_VIDEO_CATEGORIES, {
    suspend: false
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(isSelected);
  const categories = data.videocategories;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignContent: 'flex-start',
        width: '20%'
      }}
    >
      <BrowseTitle>Browse by Topic</BrowseTitle>
      <List>
        {categories.map((category: CategoryType) => {
          const { id, name } = category;
          return (
            <li className="li" key={id}>
              <Block selected={name === isSelected} onClick={() => setSelected(name)}>
                {name}
              </Block>
            </li>
          );
        })}
      </List>
    </div>
  );
};
export const CategoryBarMultipleSelect: React.FC<Props> = ({ isSelected, setSelected }) => {
  //const categories = ['Dashboard Instruction', 'Technical', 'Development', 'Other'];
  const { loading, data } = useQuery(QUERY_VIDEO_CATEGORIES, {
    suspend: false
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  const selectedArray = isSelected.split(';');
  const categories = data.videocategories;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start'
      }}
    >
      <BrowseTitle>Topics</BrowseTitle>
      <List>
        {categories.map((category: CategoryType) => {
          const { id, name } = category;
          return (
            <li className="li" key={id}>
              <Block selected={selectedArray.indexOf(name) >= 0} onClick={() => setSelected(name)}>
                {name}
              </Block>
            </li>
          );
        })}
      </List>
    </div>
  );
};
