import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";

import gql from "graphql-tag";
import styled from "styled-components";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
// import {mu} from 'react-apollo-hooks'
import { Block } from "../elements/Block";
import { ModalBackdrop, ModalWindow } from "../elements/Modal";
import { But } from "../elements/MyButton";
import Spinner from "utils/spinner";
import { useUser } from "User";
import { hasPermissionEx } from "utils/hasPermission";

const ProductFragment = gql`
  fragment ProductDetails on CloudSuiteProduct {
    id
    name
    description
    type
  }
`;

const SuitesFragment = gql`
  fragment SuiteDetails on CloudSuite {
    id
    name
    description
    imageURL
    products {
      product {
        id
        name
        type
        description
      }
      type
    }
  }
`;

const QUERY_PRODUCTS_SUITES = gql`
  ${SuitesFragment}
  query QUERY_PRODUCTS_SUITES {
    products: cloudsuiteproducts {
      id
      name
      description
      type
    }
    suites: cloudsuites {
      ...SuiteDetails
    }
  }
`;
const QUERY_PRODUCTS_SINGLE_SUITE = gql`
  ${SuitesFragment}
  query QUERY_PRODUCTS_SINGLE_SUITE($id: ID!) {
    products: cloudsuiteproducts {
      id
      name
      description
      type
    }
    suite: cloudsuite(id: $id) {
      ...SuiteDetails
    }
  }
`;

const MUTATION_ADD_PRODUCT_TO_SUITE = gql`
  ${SuitesFragment}
  mutation MUTATION_ADD_PRODUCT_TO_SUITE($input: InputAddProductToSuite) {
    addproducttosuite(input: $input) {
      ...SuiteDetails
    }
  }
`;
const Container = styled.div`
  display: flex;
  margin-top: 5rem;
  @media (max-width: 500px) {
    background: palevioletred;
    flex-direction: column;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
  background: white;
  margin: 1rem;

  min-width: 400px;
`;

const Image = styled.div`
  width: 100%;
  height: 14rem;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Padded = styled.div`
  padding: 1rem;
`;

const Footer = styled.div`
  padding: 1rem;
  align-items: flex-end;
`;
const H1 = styled.h1`
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-family: "Roboto Slab", sans-serif;
`;

const Header = styled(Padded)`
  height: 120px;
`;

const H2 = styled.h2`
  font-size: 1rem;
  color: #808080;
  margin: 0.5rem 0;
`;
const P = styled.p`
  font-size: 1.25rem;
  margin: 0;
`;
export default function CloudSuites({ history }) {
  const [showModal, toggleShow] = useState(false);
  const { loading, data } = useQuery(QUERY_PRODUCTS_SUITES, {
    suspend: false
  });

  const user = useUser();

  const permissions = user ? user.permissions || [] : [];

  const validAdmin = hasPermissionEx("ADMIN", permissions);
  useEffect(() => {
    // setProducts(data.products);
  }, [loading]);
  console.log("object 👏👏", history, permissions, validAdmin);
  if (loading || !data) return <Spinner />;
  const { products, suites } = data;
  return (
    <div>
      <Container>
        {suites.map(suite => {
          let prods = suite.products.map(prod => prod.product.name).join("-");
          let availableprods = products.filter(prod => !_.includes(prods, prod.name));
          console.log("suite", suite.name, prods, availableprods);
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
                    <Tooltip title={prod.product.description}>
                      <Block key={prod.product.id} selected={prod.product.type.toLowerCase() === "core"}>
                        {prod.product.name}
                      </Block>
                    </Tooltip>
                  ))}
                </P>
              </Padded>
              <Footer>
                {validAdmin && (
                  <But optional onClick={() => history.push("/cloudsuite/" + suite.id)}>
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
  console.log("Params", id);
  const { loading, data } = useQuery(QUERY_PRODUCTS_SINGLE_SUITE, { variables: { id }, suspend: false });
  const addMutation = useMutation(MUTATION_ADD_PRODUCT_TO_SUITE);
  console.log(data);
  if (loading) return <Spinner />;
  const { products, suite } = data;

  let prods = suite.products.map(prod => prod.product.name).join("-");
  let availableprods = products.filter(prod => !_.includes(prods, prod.name));
  console.log("suite", suite.name, prods, availableprods);
  return (
    <Article>
      <Header>
        <But secondary onClick={() => history.push("/cloudsuites/")}>
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
            <Block key={prod.product.id} selected={prod.product.type.toLowerCase() === "core"}>
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
              selected={prod.type.toLowerCase() === "core"}
              onClick={async () => {
                const input = { csuiteid: suite.id, productid: prod.id, type: prod.type };
                console.log("adding", suite.id, prod.id, prod.type);
                const result = await addMutation({ variables: { input } });
                console.log("results", result);
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
