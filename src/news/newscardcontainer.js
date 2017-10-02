import React, { Component } from "react";
import { graphql, gql } from "react-apollo";
import NewsCard from "./newscard";
import Spinner from "../utils/spinner";

class NewsCardContainer extends Component {
  myTimer = () => {
    const { nrNewsItems, index } = this.state;
    this.setState({
      index: index === nrNewsItems - 1 ? 0 : index + 1,
      nrNewsItems: this.props.news.news.length
    });
  };

  componentWillMount() {
    this.setState({
      index: 0
    });
  }

  componentDidMount() {
    this.setState({ index: 0 });
    setInterval(this.myTimer, this.props.refreshRate || 15000);
  }

  render() {
    const { news: { loading, error, news } } = this.props;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    if (error) {
      return <div>Error</div>;
    }
    let newsItem = news[this.state.index];
    return <NewsCard data={newsItem} />;
  }
}

const newsQuery = gql`
  query news {
    news {
      id
      title
      img
      body
      link
      link_text
    }
  }
`;

export default graphql(newsQuery, { name: "news" })(NewsCardContainer);
