import { GenericDataTable, TField, Widget } from "./BacklogList";
import SearchBar, { filterOn } from "common/SearchBar";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import React from "react";
import Spinner from "utils/spinner";

export const QUERY_STORAGE_USAGE = gql`
  query storage {
    storage {
      id
      date
      customer
      farm
      size
    }
  }
`;

interface IStorageData {
  id: string;
  date: string;
  customer: string;
  farm: string;
  size: number;
  sizeString?: number;
}

export function toSizeString(size: number) {
  const sizeString =
    size === 0
      ? "Size Unknown"
      : size > 1000000
      ? ((size + 0.0) / 1000000).toFixed(2) + "Tb"
      : 1000
      ? (size / 1000).toFixed(0) + " Gb"
      : size.toFixed(0) + " Mb";
  return sizeString;
}
const TenantStorage = () => {
  const [searchText, setSearchText] = useState("");
  const [storageData, setStorageData] = useState<IStorageData[] | []>([]);
  const { data, loading } = useQuery(QUERY_STORAGE_USAGE);
  useEffect(() => {
    if (data) {
      let sel = data.storage.slice();
      if (searchText) sel = data.storage.filter((storage: IStorageData) => filterOn(storage, ["farm", "customer"], "", searchText));
      console.log(`sel`, sel);
      sel = sel
        .map((storage: IStorageData) => ({ ...storage, sizeString: toSizeString(storage.size) }))
        .sort((s1: IStorageData, s2: IStorageData) => (s1.size > s2.size ? -1 : 1));
      setStorageData(sel.slice(0, 100));
    }
  }, [data, searchText]);
  if (loading) {
    return <Spinner />;
  }
  const fieldList: TField[] = [
    { name: "customer", title: "Customer", isKey: true },
    { name: "farm", title: "Farm", isKey: false },
    { name: "sizeString", title: "size", isKey: false },
  ];
  return (
    <div>
      <SearchBar onChange={(val: any) => setSearchText(val)} defaultValue={searchText} hintText="search on farm or customer" />
      <Widget data={storageData} fieldList={fieldList} title="Storage Usage per customer" />
    </div>
  );
};
export default TenantStorage;
