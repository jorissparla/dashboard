import gql from "graphql-tag";
import { graphql } from "react-apollo";
import React from "react";
import { withRouter } from "react-router";
import SupportCardForm from "./SupportCardForm";
import withAuth from "../utils/withAuth";

const SupportCardAdd = ({
  data: { loading, error, categories },
  addSupportCard,
  authenticated,
  user,
  history
}) => {
  const handleAdd = e => {
    const { id, title, description, category, link } = e;
    const categoryname = category;
    const createdby = user.email || "system";

    addSupportCard({ id, title, description, categoryname, link, createdby })
      .then(() => history.push("/supportcard"))
      .catch(e => window.alert(JSON.stringify(e, null, 2)));
  };
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <SupportCardForm
        onSave={handleAdd}
        readOnly={false}
        authenticated={authenticated}
        categories={categories}
        initialValues={{ category: "IXS" }}
      />
    </div>
  );
};

const addSupportCard = gql`
  mutation addSupportCard($input: InputCardType) {
    addSupportCard(input: $input) {
      supportcard {
        id
        title
        description
        category {
          name
        }
        link
        createdby
      }
    }
  }
`;
const CategoryQuery = gql`
  query CategoryQuery {
    categories {
      id
      name
    }
  }
`;

export default graphql(CategoryQuery)(
  graphql(addSupportCard, {
    props: ({ mutate }) => ({
      addSupportCard: input =>
        mutate({
          variables: { input }
        })
    })
  })(withAuth(withRouter(SupportCardAdd)))
);
