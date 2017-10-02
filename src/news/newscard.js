import React from "react";

const NewsCard = props => {
  const { data: { img, title, id, body, link, link_text } } = props;
  if (!props.data) {
    return <div>Loading</div>;
  }
  return (
    <div key={id} className="col s3">
      <div className="card">
        <div className="card-image">
          <img src={img} alt="" />
          <span className="card-title">{title}</span>
        </div>
        <div className="card-content">
          <p>{body}.</p>
        </div>
        <div className="card-action">
          <a href={link}>{link_text}</a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
