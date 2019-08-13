import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import useInput from '../hooks/useInput';
import ContactForm from './ContactForm';
import {
  MUTATION_ADD_PRODUCT_CONTACT,
  MUTATION_REMOVE_PRODUCT_CONTACT,
  QUERY_SINGLE_PRODUCT
} from './graphql/Queries';
import ProductForm from './ProductForm';
import { Article, H1, Header } from './Styles';
/*
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
*/
const OverThePage = styled.div`
  display: flex;
  justify-content: space-between;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  editField: {
    display: 'block',
    width: '800px',
    backgroundColor: 'lightyellow'
  },
  input: {
    display: 'none'
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#eeeeee99',
    fontSize: 40,
    maxHeight: '30vh'
  },
  dense: {
    marginTop: 19
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  markdown: {
    width: '90vw',
    maxHeight: '30vh'
  },
  content: {
    display: 'flex',
    marginLeft: '2rem',
    borderTop: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd'
  },
  content2: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2rem'
  },
  button2: {
    margin: theme.spacing.unit,
    height: '40px',
    backgroundColor: 'palevioletred'
  },
  button3: {
    margin: theme.spacing.unit,
    height: '40px'
  }
});

const SpanWrapper = styled.span`
  justify-content: center;
  text-align: center;
  align-items: center;
  display: flex;
  padding: 2px;
`;

function Product({ match, history, classes }) {
  const id = match.params.id;
  const [isEditable, setEditable] = React.useState(false);
  const contact = useInput('');
  const value = useInput('');
  const contentValue = useInput('');
  const organisation = useInput('Support');

  let content = null;

  React.useEffect(() => {
    console.log('render');
    contentValue.setValue(content);
  });

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, { variables: { id } });
  const addContact = useMutation(MUTATION_ADD_PRODUCT_CONTACT);
  //  const removeContact = useMutation(MUTATION_REMOVE_PRODUCT_CONTACT);
  if (loading) return <Spinner />;
  // const data = useProduct(id);
  console.log(data);
  const { cloudsuiteproduct } = data;
  //const { contacts } = cloudsuiteproduct;
  //setContentValue(content);

  return (
    <div>
      <Article>
        <Header>
          <OverThePage>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push('/cloudsuites')}
            >
              Back to Suites
            </Button>
            {isEditable ? (
              <SpanWrapper>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button3}
                  onClick={() => setEditable(!isEditable)}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button3}
                  onClick={() => setEditable(!isEditable)}
                >
                  Cancel
                </Button>
              </SpanWrapper>
            ) : (
              <span>
                Edit <EditIcon onClick={() => setEditable(!isEditable)} />
              </span>
            )}
          </OverThePage>
          <H1>Information </H1>
          <ProductForm product={cloudsuiteproduct} classes={classes} isEditable={isEditable} />

          <H1>Contacts </H1>
          <ContactForm />
        </Header>
      </Article>
    </div>
  );
}

export default withRouter(withStyles(styles)(Product));
