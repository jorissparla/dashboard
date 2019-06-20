import React from "react";
import { Container, Article, H1, H2, Header } from "./Styles";
import { withRouter } from "react-router";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { QUERY_SINGLE_PRODUCT, MUTATION_ADD_PRODUCT_CONTACT, MUTATION_REMOVE_PRODUCT_CONTACT } from "./graphql/Queries";
import Spinner from "utils/spinner";
import { Button, TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "../ModalWrapper";
import { Input, Form, Error } from "../styles";

import useInput from "../hooks/useInput";
import ProductForm from "./ProductForm";
const Thead = styled.thead`
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;

const TD = styled.td`
  border-bottom-color: rgba(0, 0, 0, 0.3);
  border-bottom-style: solid;
  border-top-style: solid;
  padding: 3px;
`;

const TR = styled.tr`
  :nth-child(even) {
    background-color: #f2f2f2;
  }
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

const OverThePage = styled.div`
  display: flex;
  justify-content: space-between;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  editField: {
    display: "block",
    width: "800px"
  },
  input: {
    display: "none"
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: "#eeeeee99",
    fontSize: 40,
    maxHeight: "30vh"
  },
  dense: {
    marginTop: 19
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  markdown: {
    width: "90vw",
    maxHeight: "30vh"
  },
  content: {
    display: "flex",
    marginLeft: "2rem",
    borderTop: "solid 1px #ddd",
    borderBottom: "solid 1px #ddd"
  },
  button2: {
    margin: theme.spacing.unit,
    height: "40px",
    backgroundColor: "palevioletred"
  }
});

function useProduct(id) {
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, { suspend: false, variables: { id } });
  const defaults = { cloudsuiteproduct: { name: "", description: "", contacts: [], content: "" } };
  if (loading) return defaults;
  else return data;
}

function Product({ match, history, classes }) {
  const id = match.params.id;
  const [isModal, toggle] = React.useState(false);
  const [isEditable, setEditable] = React.useState(false);
  const contact = useInput("");
  const value = useInput("");
  const contentValue = useInput("");
  const organisation = useInput("Support");

  let content = null;

  React.useEffect(() => {
    console.log("render");
    contentValue.setValue(content);
  });

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
  // const data = useProduct(id);
  console.log(data);
  const { cloudsuiteproduct } = data;
  const { contacts } = cloudsuiteproduct;
  //setContentValue(content);

  return (
    <div>
      <Article>
        <Header>
          <OverThePage>
            <Button color="primary" variant="contained" onClick={() => history.push("/cloudsuites")}>
              Back to Suites
            </Button>
            <span>
              Edit <EditIcon onClick={() => setEditable(!isEditable)} />
            </span>
          </OverThePage>
          <ProductForm product={cloudsuiteproduct} classes={classes} isEditable={isEditable} />

          <H1>
            Contacts{" "}
            <Fab size="small" color="secondary" aria-label="Add" onClick={() => toggle(!isModal)}>
              <AddIcon />
            </Fab>
          </H1>
          <table>
            <Thead>
              <tr>
                <TD>type</TD>
                <TD>name</TD>
                <TD>organisation</TD>
                <TD> </TD>
              </tr>
            </Thead>
            <tbody>
              {contacts.map(({ contacttype, value, organisation, id }) => {
                return (
                  <TR key={id}>
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
                  </TR>
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
