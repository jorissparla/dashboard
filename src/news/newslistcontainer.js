import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews } from "../actions/index";
import NewsList from "./newslist";
import { browserHistory } from "react-router";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Paper from "material-ui/Paper";

class NewsListContainer extends Component {
  onOpen(id) {
    browserHistory.push(`/news/edit/${id}`);
  }

  onNew() {
    browserHistory.push(`/news/add`);
  }
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const { news } = this.props;
    return (
      <div>
        <Paper style={{ padding: "10px" }}>
          <FloatingActionButton
            mini={true}
            secondary={true}
            style={{ marginRight: 20 }}
            onClick={() => this.onNew()}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Paper>
        <NewsList news={news} onEdit={this.onOpen} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { news: state.summary.news };
};

export default connect(mapStateToProps, { fetchNews })(NewsListContainer);
