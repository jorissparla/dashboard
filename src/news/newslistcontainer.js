import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Paper from "material-ui/Paper";
import { fetchNews } from "../actions/index";
import NewsList from "./newslist";
import withAuth from "../utils/withAuth";

class NewsListContainer extends Component {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
  }

  onOpen(id) {
    this.props.history.replace(`/news/edit/${id}`);
  }

  onNew() {
    this.props.history.push(`/news/add`);
  }
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPP");
    const { news, authenticated } = this.props;
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

export default connect(mapStateToProps, { fetchNews })(withRouter(withAuth(NewsListContainer)));
