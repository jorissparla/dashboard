import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import * as React from "react";
import { Block } from "../elements/Block";

const List = ({ children }: any) => <div className="flex flex-wrap list-none">{children}</div>;

const BrowseTitle = ({ children }: any) => <h5 className="ml-2 uppercase font-bold text-xl">{children}</h5>;

const QUERY_VIDEO_CATEGORIES = gql`
  query QUERY_VIDEO_CATEGORIES {
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
  const { loading, data } = useQuery(QUERY_VIDEO_CATEGORIES, {});
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
        width: "20%",
      }}
    >
      <BrowseTitle>Browse by Topic</BrowseTitle>
      <List>
        {categories.map((category: CategoryType) => {
          const { id, name } = category;
          return (
            <button className="li" key={id} onClick={() => setSelected(name)}>
              <Block selected={name === isSelected}>{name}</Block>
            </button>
          );
        })}
      </List>
    </div>
  );
};
export const CategoryBarMultipleSelect: React.FC<Props> = ({ isSelected = "NEW", setSelected }) => {
  //const categories = ['Dashboard Instruction', 'Technical', 'Development', 'Other'];
  const { loading, data } = useQuery(QUERY_VIDEO_CATEGORIES, {});
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
        alignContent: "flex-start",
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
