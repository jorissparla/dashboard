import React from "react";
import styled from "styled-components";
import { Block } from "../elements/Block";
import { But } from "../elements/MyButton";

const Container = styled.div`
  display: flex;
  margin-top: 5rem;
  @media (max-width: 500px) {
    background: palevioletred;
    flex-direction: column;
  }
`;

const Article = styled.article`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
  background: white;
  margin: 1rem;

  min-width: 300px;
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

const H1 = styled.h1`
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-family: "Roboto Slab", sans-serif;
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
  return (
    <Container>
      <Article>
        <Padded>
          <H1>Cloudsuite Automotive</H1>
          <H2>Subtitel</H2>
        </Padded>
        <Image>
          <Img src="https://nlbavwixs.infor.com/images/infor/Automotive2.jpg" alt="CloudSuite" />
        </Image>
        <Padded>
          <P>
            <Block>LN ERP</Block>
            <Block>Infor OS</Block>
            <Block>Factory Track</Block>
            <Block selected={true} outline={true}>
              LN ERP
            </Block>
          </P>
        </Padded>
        <Padded>
          <But>contacts</But>
        </Padded>
      </Article>
      <Article>
        <Padded>
          <H1>CloudSuite Industrial Machinery</H1>
          <H2>Subtitel</H2>
        </Padded>
        <Image>
          <Img src="https://nlbavwixs.infor.com/images/infor/Industrial.jpg" alt="CloudSuite" />
        </Image>
        <Padded>
          <P>
            <Block>LN ERP</Block>
            <Block>Infor OS</Block>
            <Block>Factory Track</Block>
            <Block selected={true}>LN ERP</Block>
          </P>
        </Padded>
        <Padded>
          <Block>Joris Sparla</Block>
          <Block>Joris Sparla</Block>
        </Padded>
      </Article>
    </Container>
  );
}
