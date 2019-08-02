import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';

import _ from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';
// import {mu} from 'react-apollo-hooks'
import { Block } from '../elements/Block';
import { ModalBackdrop, ModalWindow } from '../elements/Modal';
import { But } from '../elements/MyButton';
import Spinner from 'utils/spinner';
import { useUser } from 'User';
import { hasPermissionEx } from 'utils/hasPermission';
import {
  Container,
  Article,
  Header,
  H1,
  H2,
  Image,
  Img,
  Padded,
  P,
  Footer
} from '../cloudsuite/Styles';
import {
  QUERY_PRODUCTS_SUITES,
  QUERY_PRODUCTS_SINGLE_SUITE,
  MUTATION_ADD_PRODUCT_TO_SUITE
} from '../cloudsuite/graphql/Queries';

export default function CloudSuites({ history }) {
  const [showModal, toggleShow] = useState(false);
  const { loading, data } = useQuery(QUERY_PRODUCTS_SUITES, {
    suspend: false
  });

  const user = useUser();

  const permissions = user ? user.permissions || [] : [];

  const validAdmin = hasPermissionEx('ADMIN', permissions);
  useEffect(() => {
    // setProducts(data.products);
  }, [loading]);
  console.log('object 👏👏', history, permissions, validAdmin);
  if (loading || !data) return <Spinner />;
  const { products, suites } = data;
  return (
    <div>
      <Container>
        {suites.map(suite => {
          let prods = suite.products.map(prod => prod.product.name).join('-');
          let availableprods = products.filter(prod => !_.includes(prods, prod.name));
          console.log('suite', suite.name, prods, availableprods);
          return (
            <Article key={suite.id}>
              <Header>
                <H1>{suite.name}</H1>
                <H2>{suite.description}</H2>
              </Header>
              <Image>
                <Img src={suite.imageURL} alt="CloudSuite" />
              </Image>
              <Padded>
                <P>
                  {suite.products.map(prod => (
                    <Tooltip title={prod.product.description} key={prod.product.id}>
                      <Block
                        key={prod.product.id}
                        selected={prod.product.type.toLowerCase() === 'core'}
                        onClick={() => history.push(`/cloudsuites/product/${prod.product.id}`)}
                      >
                        {prod.product.name}
                      </Block>
                    </Tooltip>
                  ))}
                </P>
              </Padded>
              <Footer>
                {validAdmin && (
                  <But optional onClick={() => console.log({ suite })}>
                    Products
                  </But>
                )}
                <But secondary>contacts</But>
              </Footer>
            </Article>
          );
        })}
      </Container>
    </div>
  );
}

export const CloudSuitePage = ({
  history,
  match: {
    params: { id }
  }
}) => {
  console.log('Params', id);
  const { loading, data } = useQuery(QUERY_PRODUCTS_SINGLE_SUITE, {
    variables: { id },
    suspend: false
  });
  const addMutation = useMutation(MUTATION_ADD_PRODUCT_TO_SUITE);
  console.log(data);
  if (loading) return <Spinner />;
  const { products, suite } = data;

  let prods = suite.products.map(prod => prod.product.name).join('-');
  let availableprods = products.filter(prod => !_.includes(prods, prod.name));
  console.log('suite', suite.name, prods, availableprods);
  return (
    <Article>
      <Header>
        <But secondary onClick={() => history.push('/cloudsuites/')}>
          Back to Suites
        </But>
        <H1>Edit products for {suite.name}</H1>
        <H2>{suite.description}</H2>
      </Header>
      <Image>
        <Img src={suite.imageURL} alt="CloudSuite" />
      </Image>
      <Padded>
        <P>
          {suite.products.map(prod => (
            <Block key={prod.product.id} selected={prod.product.type.toLowerCase() === 'core'}>
              {prod.product.name}
            </Block>
          ))}
        </P>
      </Padded>
      <hr />
      <Footer>
        <H2>Available Products</H2>
        <P>
          {availableprods.map(prod => (
            <Block
              key={prod.id}
              selected={prod.type.toLowerCase() === 'core'}
              onClick={async () => {
                const input = { csuiteid: suite.id, productid: prod.id, type: prod.type };
                console.log('adding', suite.id, prod.id, prod.type);
                const result = await addMutation({ variables: { input } });
                console.log('results', result);
              }}
            >
              {prod.name}
            </Block>
          ))}
        </P>
      </Footer>
    </Article>
  );
};
