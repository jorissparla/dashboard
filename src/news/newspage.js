import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import styled from "styled-components";
import { format } from "date-fns";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #fff;
  min-height: 100px;
  border-bottom: solid 1px lightgrey;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: flex-start;
`;

const Title = styled.h3`
  font-family: Raleway;
  font-weight: 200;
  padding-left: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 5px;
  border: 1px solid lightgrey;
`;

const DateSection = styled.div`
  padding-left: 10px;
  justify-content: flex-start;
  font-family: Roboto;
  padding-top: 5px;
  font-size: 18px;
  display: flex;

  height: 30px;
  justify-content: center;
  align-content: center;
`;

const PrimaryText = styled.h3`
  display: flex;
  font-weight: 300;
  font-family: Raleway;
  color: #0276ae;
`;

const SecondaryText = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  padding-bottom: 10px;
  white-space: pre-line;
`;

const TextSection = styled.div`
  display: flex;
  font-family: Roboto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 10px;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 350px;
  height: 200px;
  display: flex;
  object-fit: cover;
`;
const NewsItem = ({ news }) => {
  return (
    <Row>
      <InfoSection>
        <Avatar src={news.img} />
        <DateSection>{format(news.create_date, "ddd, DD MMMM YYYY")}</DateSection>
      </InfoSection>
      <TextSection>
        <PrimaryText>{news.title}</PrimaryText>
        <SecondaryText> {news.body}</SecondaryText>
      </TextSection>
    </Row>
  );
};

const NewsPage = props => {
  if (props.data.loading) {
    return <div>Loading...</div>;
  }
  if (props.error) {
    return <div>E</div>;
  }
  const { data: { news } } = props;
  if (!news) {
    return <div>No news</div>;
  }
  return (
    <div>
      <Title>What's New?</Title>

      {news.map(item => <NewsItem news={item} key={item.id} />)}
    </div>
  );
};

const NewsItemsQuery = gql`
  query news {
    news {
      id
      title
      body
      create_date
      img
    }
  }
`;

export default graphql(NewsItemsQuery, { name: "data" })(NewsPage);
