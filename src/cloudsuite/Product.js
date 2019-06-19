import React from "react";
import { Container, Article, H1, H2, Header } from "./Styles";
import { withRouter } from "react-router";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { QUERY_SINGLE_PRODUCT, MUTATION_ADD_PRODUCT_CONTACT, MUTATION_REMOVE_PRODUCT_CONTACT } from "./graphql/Queries";
import Spinner from "utils/spinner";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../ModalWrapper";
import { Input, Form, Error } from "../styles";

const Thead = styled.thead`
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;

const DeleteButton = styled.button`
  background: transparent;
  font-size: 18px;
  font-weight: 600;
  border: none;
  :hover {
    cursor: pointer;
    font-weight: 900;
    color: darkred;
  }
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function useInput(defaultValue) {
  const [value, setValue] = React.useState(defaultValue);

  function onChange(e) {
    setValue(e.target.value);
  }
  function clear() {
    setValue("");
  }
  return { value, onChange, clear };
}

function Product({ match, history, classes }) {
  const id = match.params.id;
  const [isModal, toggle] = React.useState(false);
  const contact = useInput("");
  const value = useInput("");
  const organisation = useInput("Support");

  function clearInputValues() {
    organisation.clear();
    contact.clear();
    value.clear();
  }

  async function saveInput() {
    const input = {
      productid: id,
      contacttype: contact.value,
      organisation: organisation.value,
      value: value.value
    };
    addContact({ variables: { input } });
    console.log("input", input);
  }
  const productid = id;
  console.log(id);
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, { suspend: false, variables: { id } });
  const addContact = useMutation(MUTATION_ADD_PRODUCT_CONTACT);
  const removeContact = useMutation(MUTATION_REMOVE_PRODUCT_CONTACT);
  if (loading) return <Spinner />;
  if (!data) return <div>No data</div>;
  const { cloudsuiteproduct } = data;
  const { name, description, contacts } = cloudsuiteproduct;
  console.log(data);

  return (
    <div>
      <Article>
        <Header>
          <Button color="primary" variant="contained" onClick={() => history.push("/cloudsuites")}>
            Back to Suites
          </Button>
          <H1>{name}</H1>
          <H2>{description}</H2>
        </Header>
        <Header>
          <H1>
            Contacts{" "}
            <Fab size="small" color="secondary" aria-label="Add" onClick={() => toggle(!isModal)}>
              <AddIcon />
            </Fab>
          </H1>
          <table>
            <Thead>
              <tr>
                <td>type</td>
                <td>name</td>
                <td>organisation</td>
              </tr>
            </Thead>
            <tbody>
              {contacts.map(({ contacttype, value, organisation, id }) => {
                return (
                  <tr>
                    <td>{contacttype}</td>
                    <td>{value}</td>
                    <td>{organisation}</td>
                    <td>
                      <DeleteButton
                        onClick={async () => {
                          const input = {
                            id,
                            productid
                          };
                          await removeContact({ variables: { input } });
                        }}
                      >
                        &times;
                      </DeleteButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Header>
        <Modal on={isModal} toggle={() => toggle(!isModal)} height={50} top={10}>
          <div>
            <H1>Add Contact</H1>
            <Header>
              <Input placeholder="type" {...contact} />
              <Input placeholder="value" {...value} />
              <Input placeholder="organisation" {...organisation} />
            </Header>
            <Header>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={() => {
                  saveInput();
                  clearInputValues();
                  toggle(!isModal);
                }}
              >
                Save
              </Button>
              <Button color="secondary" variant="contained" className={classes.button} onClick={() => toggle(!isModal)}>
                Cancel
              </Button>
            </Header>
          </div>
        </Modal>
      </Article>
    </div>
  );
}

export default withRouter(withStyles(styles)(Product));
