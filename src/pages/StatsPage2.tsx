import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { QUERY_BACKLOG, QUERY_LAST_UPDATED } from "../stats/queries/BACKLOG_QUERY2a";
import Spinner from "utils/spinner";

interface Props {}

export const StatsPage: React.FC<Props> = () => {
  const { loading, data } = useQuery(QUERY_LAST_UPDATED);
  if (loading) {
    return <Spinner />;
  }
  console.log(data);
  let mostRecentUpdate: string = "";

  if (data) {
    ({ mostRecentUpdate } = data);
  }
  return (
    <div>
      <MyPage mostRecentUpdate={mostRecentUpdate} />
    </div>
  );
};

const DataPage: React.FC<{ mostRecentUpdate: string }> = ({ mostRecentUpdate }) => {
  console.log("render");
  const products = ["LN"];
  const { loading, data } = useQuery(QUERY_BACKLOG, { variables: { products } });
  if (loading) {
    return <Spinner />;
  }
  console.log(data);
  return <div>Data</div>;
};

const MyPage = React.memo(DataPage);
