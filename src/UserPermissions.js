import { gql, useMutation, useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "globalState/AlertContext";
import { useUser } from "User";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Spinner from "utils/spinner";
import SearchBar from "./common/SearchBar";
import { hasPermission } from "./utils/hasPermission";
import { useHistory } from "react-router";
import { useHasPermissions } from "globalState/UserProvider";

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
  name: {
    marginLeft: 10,
    marginRight: 10,
    alignContent: "center",
    alignSelf: "center",
    width: 250,
  },
  button: {
    margin: theme.spacing(1),
    width: 150,
    marginRight: 50,
  },
});

const PERMISSIONS_MUTATION = gql`
  mutation PERMISSIONS_MUTATION($where: WhereAccountInput, $data: UpdateAccountDataPermissionsInput) {
    updatePermissions(where: $where, data: $data) {
      id
      fullname
      firstname
      lastname
      team
      image
      permissions {
        permission
      }
    }
  }
`;

const QUERY_ALL_PERMISSIONS = gql`
  query QUERY_ALL_PERMISSIONS {
    users: supportfolks {
      id
      fullname
      firstname
      lastname
      team
      image
      permissions {
        permission
      }
    }
    allPermissions {
      id
      permission
    }
  }
`;

const UpdatePermissions = (props) => {
  const alert = useAlert();
  const [searchText, setSearchText] = useState("");
  const user = useUser();
  const [perm] = useHasPermissions(["ADMIN"]);
  console.log(user);
  const history = useHistory();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updatePermissions] = useMutation(PERMISSIONS_MUTATION);
  const { data, loading } = useQuery(QUERY_ALL_PERMISSIONS);
  if (!perm) {
    history.push("/");
  }

  async function handlePermChange(id, currentPermissions, hasPermission, perm, updatePermissions) {
    const newPermissions = hasPermission ? currentPermissions.filter((p) => p !== perm) : [...currentPermissions, perm];
    await updatePermissions({
      variables: {
        where: { id },
        data: { permissions: newPermissions },
      },
    });
    if (hasPermission) {
      alert.setMessage(`Permission ${perm} was removed`);
    } else {
      alert.setMessage(`Permission ${perm} was added`);
    }
  }

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
  function changeSearchText(value) {
    console.log("change");
    const newusers = data.users
      .filter(
        (user) => filterOn(user, ["fullname", "team"], "permissions.permission", searchText)
        //_.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
      )
      .slice(0, 20);
    setFilteredUsers(newusers);
  }
  useEffect(() => {
    if (data) {
      setFilteredUsers(data.users);
      changeSearchText(searchText);
    }
  }, [data, searchText]);
  const { classes } = props;

  if (loading) {
    return <Spinner />;
  }
  const { allPermissions, users } = data;
  return (
    <div>
      <SearchBar hintText="Enter name or permission" onChange={(value) => setSearchText(value)} />
      {filteredUsers.map(({ id, fullname, permissions, image, firstname, lastname }) => {
        const current = permissions.map((p) => p.permission);
        const initials = (firstname[0] + lastname[0]).toUpperCase();
        return (
          <React.Fragment key={id}>
            <FormGroup row>
              {image ? <Avatar src={image} className={classes.avatar} /> : <Avatar className={classes.avatar}>{initials}</Avatar>}
              <Typography variant="h6" gutterBottom className={classes.name}>
                {fullname}
              </Typography>
              {allPermissions.map((perm) => {
                const validPermission = hasPermission(perm.permission, current);
                return (
                  <FormControlLabel
                    key={perm.id}
                    control={
                      <Switch
                        checked={validPermission}
                        color="primary"
                        onChange={() => handlePermChange(id, current, validPermission, perm.permission, updatePermissions)}
                        value={perm.permission}
                      />
                    }
                    label={perm.permission}
                  />
                );
              })}
            </FormGroup>
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(UpdatePermissions);
