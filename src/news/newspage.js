import React from "react";
import { gql, graphql } from "react-apollo";
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
`;

const Title = styled.h1`
font-family: Roboto;
font-weight: 200;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const DateSection = styled.div`
  justify-content: center;
  font-family: Roboto;
  display: flex;
`;

const PrimaryText = styled.h2`
  font-weight: 300;
`;

const SecondaryText = styled.div`
  padding-bottom: 10px;
`;

const TextSection = styled.div`
  display: flex;
  font-family: Roboto;
  flex-direction: column;
  
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  padding: 10px;
  margin: 10px;
  border-radius: 50%;
`;
const NewsItem = ({ news }) => {
  return (
    <Row>
      <InfoSection>
        <Avatar src={news.img} />
        <DateSection>{format(news.create_date, "DD-MMM-YYYY")}</DateSection>
      </InfoSection>
      <TextSection>
        <PrimaryText>{news.title}</PrimaryText>
        <SecondaryText> {news.body}</SecondaryText>
      </TextSection>
    </Row>
  );
};

const NewsPage = props => {
  console.log(props);
  if (props.data.loading) {
    return <div>Loading...</div>;
  }
  if (props.error) {
    return <div>E</div>;
  }
  const { data: { news } } = props;
  console.log(news);
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
