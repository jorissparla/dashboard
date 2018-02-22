import React, { Component } from "react";

import { withRouter } from "react-router";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Paper from "material-ui/Paper";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import NewsList from "./newslist";
import withAuth from "../utils/withAuth";

class NewsListContainer extends Component {
  constructor(props) {
    super(props);
  }

  onOpen = id => {
    this.props.history.replace(`/news/edit/${id}`);
  };

  onNew() {
    this.props.history.push(`/news/add`);
  }

  render() {
    const { authenticated, data: { loading, news } } = this.props;
    if (loading) return <div>Loading</div>;
    return (
      <div>
        <Paper style={{ padding: "10px" }}>
          <h4>News</h4>
          {authenticated && (
            <FloatingActionButton
              mini={true}
              secondary={true}
              style={{ marginRight: 20 }}
              onClick={() => this.onNew()}
            >
              <ContentAdd />
            </FloatingActionButton>
          )}
        </Paper>
        <NewsList news={news} onEdit={this.onOpen} authenticated={authenticated} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { news: state.summary.news };
};

const newsQuery = gql`
  query news {
    news {
      title
      body
      img
      expire_date
      id
    }
  }
`;

//export default connect(mapStateToProps, { fetchNews })(withRouter(withAuth(NewsListContainer)));
export default graphql(newsQuery)(withRouter(withAuth(NewsListContainer)));
