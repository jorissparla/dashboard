import { graphql } from "@apollo/client/react/hoc";
import { useAlert } from "globalState/AlertContext";
import { useUserContext } from "globalState/UserProvider";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import withAuth from "../utils/withAuth";
import SupportCardForm from "./SupportCardForm";

const SupportCardEdit = (props) => {
  const history = useHistory();
  const alert = useAlert();
  const [currentUser, setCurrentUser] = useState(null);
  const ctx = useUserContext();

  useEffect(() => {
    if (ctx && ctx.user) {
      setCurrentUser(ctx.user);
    }
  }, [ctx]);
  function handleDelete(e) {
    const { id } = e;
    props
      .deleteSupportCard({ id })
      // .then(props.data.refetch())
      .then(() => setTimeout(history.push("/supportcard"), 500))
      .catch((e) => alert(JSON.stringify(e, null, 2)));
  }

  const handleSave = async (e) => {
    const { id, title, description, categoryname, link, owner = "none" } = e;

    await props
      .modifySupportCard({
        id,
        title,
        description,
        categoryname,
        link,
        owner,
        updatedBy: currentUser.email,
      })
      // .then(props.data.refetch())
      .then(() => history.push("/supportcard"))
      .catch((e) => window.alert(JSON.stringify(e, null, 2)));
  };

  const { loading, error, categories, supportcard, me } = props.data;
  const { authenticated, isEditor } = props;
  console.log("me", me);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <SupportCardForm
      initialValues={supportcard}
      supportcard={supportcard}
      onSave={async (values) => {
        await handleSave(values);
        alert.setMessage("saved SupportCard");
      }}
      onDelete={async (values) => {
        await handleDelete(values);
        alert.setMessage("Deleted SupportCard");
      }}
      readOnly={!(authenticated && isEditor)}
      authenticated={authenticated && isEditor}
      categories={categories}
    />
  );
};

const CURRENT_SUPPORTCARD_QUERY = gql`
  query CURRENT_SUPPORTCARD_QUERY($id: String) {
    supportcard(id: $id) {
      id
      title
      description
      categoryname
      category {
        name
      }
      link
      owner
      created
      updatedAt
      keywords
    }
    categories {
      id
      name
    }
    me {
      id
      fullname
    }
  }
`;

const DELETE_SUPPORTCARD_MUTATION = gql`
  mutation DELETE_SUPPORTCARD_MUTATION($input: InputCardType) {
    deleteSupportCard(input: $input) {
      id
    }
  }
`;

const UPDATE_SUPPORTCARD_MUTATION = gql`
  mutation UPDATE_SUPPORTCARD_MUTATION($input: InputCardType) {
    modifySupportCard(input: $input) {
      supportcard {
        id
        title
        description
        categoryname
        link
      }
    }
  }
`;

export default graphql(DELETE_SUPPORTCARD_MUTATION, {
  props: ({ mutate }) => ({
    deleteSupportCard: (input) =>
      mutate({
        variables: {
          input,
        },
      }),
  }),
})(
  graphql(UPDATE_SUPPORTCARD_MUTATION, {
    props: ({ mutate }) => ({
      modifySupportCard: (input) =>
        mutate({
          variables: {
            input,
          },
        }),
    }),
  })(
    graphql(CURRENT_SUPPORTCARD_QUERY, {
      options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }),
    })(withRouter(withAuth(SupportCardEdit)))
  )
);
