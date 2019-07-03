import * as React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { Block } from "../elements/Block";

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
  const categories = data.videocategories || [];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "flex-start",
        width: "20%"
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
export const CategoryBarMultipleSelect: React.FC<Props> = ({ isSelected = "NEW", setSelected }) => {
  //const categories = ['Dashboard Instruction', 'Technical', 'Development', 'Other'];
  const { loading, data } = useQuery(QUERY_VIDEO_CATEGORIES, {
    suspend: false
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  const selectedArray = isSelected.split(";");
  const categories = data.videocategories;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start"
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
