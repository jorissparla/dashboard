import { useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "common/SearchBar";
import { useAlert } from "globalState/AlertContext";
import gql from "graphql-tag";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { hasPermission } from "./utils/hasPermission";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
    background: "#eee",
  },
  paper: {
    margin: 10,
    height: 1000,
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
  },

  button: {
    margin: theme.spacing(1),
    width: 150,
    marginRight: 50,
  },
});

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($where: WhereAccountInput, $data: UpdateAccountDataPermissionsInput) {
    updatePermissions(where: $where, data: $data) {
      id
      permissions {
        permission
      }
    }
  }
`;

const QUERY_ALL_USER_PERMISSIONS = gql`
  query QUERY_ALL_USER_PERMISSIONS {
    allPermissions {
      id
      permission
    }
    users: supportfolks {
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

const UpdatePermissions = (props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const alert = useAlert();
  const { data, loading } = useQuery(QUERY_ALL_USER_PERMISSIONS);

  useEffect(() => {
    if (data) {
      let sel = data.users.slice(1, 10);
      if (searchText) sel = data.users.filter((user) => filterOn(user, ["fullname", "team"], "permissions.permission", searchText));
      setSelectedUsers(sel.slice(0, 10));
    }
  }, [searchText]);
  if (loading) {
    return "Loading";
  }
  const allPermissions = data.allPermissions;
  const users = data.users;
  const { me } = data;
  console.log(selectedUsers);

  const permissionsAr = (me || { permissions: [{ permission: "ADMIN" }] }).permissions.map((p) => p.permission);
  if (!hasPermission("ADMIN", permissionsAr)) {
    return "No permission";
  }
  return (
    <div>
      <SearchBar onChange={(val) => setSearchText(val)} value={searchText} />
      {selectedUsers.map(({ id, fullname, permissions, image, firstname, lastname }) => {
        const current = permissions.map((p) => p.permission);
        const initials = (firstname[0] + lastname[0]).toUpperCase();
        return (
          <div className="flex flex-wrap flex-col my-1  pb-3 pl-2 border-b border-gray-200">
            <div className="flex ">
              {image ? <Avatar src={image} className="bg-orange-500 text-white" /> : <Avatar className="bg-orange-500 text-white">{initials}</Avatar>}
              <button className="w-40 rounded-lg ml-8 px-2 py-1 hover:shadow-lg hover:bg-teal-300 hover:border-teal-200 font-sans font-semibold mx-2 align-center flex items-center justify-center text-gray-700 text-center">
                {fullname}
              </button>
              {allPermissions.map((perm, index) => {
                const validPermission = hasPermission(perm.permission, current);
                // return (
                //   // <!-- This example requires Tailwind CSS v2.0+ -->
                //   <div
                //     key={index}
                //     className="flex items-center space-y-1"
                //     type="button"
                //     onClick={() => handlePermChange(id, current, validPermission, perm.permission, updatePermissionMutation)}
                //   >
                //     {/* <!-- On: "bg-indigo-600", Off: "bg-gray-200" --> */}
                //     <button
                //       type="button"
                //       aria-pressed="false"
                //       aria-labelledby="toggleLabel"
                //       className={
                //         validPermission
                //           ? "bg-teal-300 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                //           : "bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                //       }
                //     >
                //       <span className="sr-only">Use setting</span>
                //       {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
                //       <span
                //         aria-hidden="true"
                //         className={
                //           validPermission
                //             ? "translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                //             : "translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                //         }
                //       ></span>
                //     </button>
                //     <span className="ml-3 mr-2" id="toggleLabel">
                //       <span className="text-sm font-medium text-gray-900">{perm.permission} </span>
                //     </span>
                //   </div>
                // );
              })}
            </div>
            <div>Test</div>
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(UpdatePermissions);
