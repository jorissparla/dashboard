import React from "react";
import { useQuery } from "@apollo/client";
import NiceSpinner from "utils/NiceSpinner";
import CloudField from "./CloudField";
import { CLOUD_READINESS_QUERY } from "./graphql/Queries";

export default function CloudSuite() {
  const { data, loading } = useQuery(CLOUD_READINESS_QUERY);
  if (loading) {
    return <NiceSpinner />;
  }

  const { cloudreadiness } = data;
  return (
    <div>
      <CloudField name="maintext" label="Readiness List" initialValue={cloudreadiness} />
    </div>
  );
}
