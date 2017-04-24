import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews } from "./actions/index";

class AppCard extends Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const { index } = this.props || 0;
    const newsItem = this.props.news[index];
    if (!newsItem) {
      return <div>Loading...</div>;
    }
    return (
      <div className="col s3">
        <div className="card">
          <div className="card-image">
            <img src={newsItem.img} alt="" />
            <span className="card-title">{newsItem.title}</span>
          </div>
          <div className="card-content">
            <p>{newsItem.body}.</p>
          </div>
          <div className="card-action">
            <a href={newsItem.link}>{newsItem.link_text}</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { news: state.summary.news };
};

export default connect(mapStateToProps, { fetchNews })(AppCard);
