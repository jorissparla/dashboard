import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import _ from "lodash";
// import {mu} from 'react-apollo-hooks'
import { Block } from "../elements/Block";
import { But } from "../elements/MyButton";
import Spinner from "utils/spinner";
import Modal from "../ModalWrapper";

const QUERY_PRODUCTS_SUITES = gql`
  query QUERY_PRODUCTS_SUITES {
    products: cloudsuiteproducts {
      id
      name
      description
      type
    }
    suites: cloudsuites {
      id
      name
      description
      imageURL
      products {
        product {
          id
          name
        }
        type
      }
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
export default function CloudSuites() {
  const [showModal, toggleShow] = useState(false);
  const { loading, data } = useQuery(QUERY_PRODUCTS_SUITES, {
    suspend: false
  });
  useEffect(() => {
    // setProducts(data.products);
  }, [loading]);

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
                    <Block key={prod.product.id} selected={prod.type === "included"}>
                      {prod.product.name}
                    </Block>
                  ))}
                </P>
              </Padded>
              <Footer>
                <Modal
                  on={showModal}
                  toggle={() => {
                    toggleShow(!showModal);
                  }}
                >
                  Edit Products for {suite.name}({availableprods.length})
                  <P>
                    {availableprods.map(prod => (
                      <Block key={prod.id} selected={prod.type === "included"}>
                        {prod.name}
                      </Block>
                    ))}
                  </P>
                </Modal>
                <But optional onClick={() => toggleShow(true)}>
                  Edit
                </But>
                <But secondary>contacts</But>
              </Footer>
            </Article>
          );
        })}
      </Container>
    </div>
  );
}
