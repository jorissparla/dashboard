import React, { useState } from "react";
import { Query, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import SearchBar from "./common/SearchBar";
import _ from "lodash";
import NiceSpinner from "utils/NiceSpinner";

const QUERY_SUPPORT_FOLKS = gql`
  query QUERY_SUPPORT_FOLKS {
    supportfolks {
      id
      navid
      fullname
      firstname
      lastname
      team
      location
      locationdetail {
        name
        location
      }
      image
      permissions {
        permission
      }
    }
  }
`;

function filterOn(object, fields = [], nestedFields = "", value) {
  const res = fields.some((field) => _.includes(object[field].toUpperCase(), value.toUpperCase()));
  let res2 = false;
  if (nestedFields) {
    const [field, subfield] = nestedFields.split(".");
    res2 = object[field].some((sf) => _.includes(sf[subfield].toUpperCase(), value.toUpperCase()));
  }
  return res || res2;
  //|| nestedFields.some(_.includes(object)));
}

const UserSearchList = (props) => {
  const { data, loading } = useQuery(QUERY_SUPPORT_FOLKS);
  const [searchText, setSearchText] = useState("");
  if (loading) return <NiceSpinner />;

  const handleChange = (value) => {
    setSearchText(value);
  };

  const { limit = 5 } = props;
  // const { searchFields = ['fullname'] } = this.props;

  const filteredUsers = data.supportfolks
    .filter(
      (user) => filterOn(user, ["fullname", "team"], "permissions.permission", searchText)
      //_.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
    )
    .slice(0, limit);
  return (
    <div>
      <SearchBar onChange={handleChange} {...props} />
      {props.children({ users: filteredUsers })}
    </div>
  );
};
export default UserSearchList;
