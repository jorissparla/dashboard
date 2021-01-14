import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { CardSection } from "../common";
//import { format } from 'date-fns';
import { format } from "../utils/format";
const QUERY_NEWSITEMS = gql`
  query QUERY_NEWSITEMS {
    news {
      id
      title
      body
      create_date
      img
    }
  }
`;

function MediaNewsCard({ news: { title, body, img, create_date } }) {
  const newImage = img.replace("http:", "https:");
  return (
    <div className="rounded bg-white shadow-lg m-2">
      <div className="w-full object-cover">
        <div className="relative">
          <img className="object-center object-cover h-64 w-full z-10 border-b border-gray-300" src={newImage} alt="newsItem" />
          <div className="  bg-gray-100 h-20 overflow-hidden shadow py-1 px-2 rounded-lg flex ">
            <h1 className="text-black text-xl font-bold font-pop">{title}</h1>
          </div>
        </div>

        <div className="flex flex-col items-between justify-between">
          <div className="">
            <p className="text-sm text-grey-600 font-open  h-48 overflow-hidden ">{body}</p>
          </div>
          <div className="px-3 flex items-center mb-2 border-t border-grey-200">
            <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
            </svg>
            <span className=" px-3 mt-2 text-sm tracking-wide text-gray-600"> {format(create_date, "EEE dd MMM yyyy")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const NewsPage = (props) => {
  const { classes } = props;
  const { loading, data } = useQuery(QUERY_NEWSITEMS);
  if (loading) {
    return "loading...";
  }
  if (!data || !data.news) {
    return "Cannot connect to server, please contact the administrator";
  }
  const { news } = data;
  return (
    <div className="h-full bg-gray-100">
      {" "}
      <div className="flex mt-1 p bg-white items-center ">
        <div className="text-xl font-pop font-semibold mb-2 px-2 text-gray-600">#ProudToWorkInSupport</div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 gap-1">
        {news.map((item) => (
          <MediaNewsCard news={item} key={item.id} classes={classes} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
