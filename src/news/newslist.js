import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ModeEdit from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";
import { ListItemSecondaryAction } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { format } from "../utils/format";

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  left: 15px;
`;
const DateField = styled.div`
  font-size: 10px;
`;

const NewsList = (props) => {
  const { news = [], authenticated } = props;
  return news.map((newsitem) => {
    const { title, body, img, expire_date, id } = newsitem;
    return (
      <ul className="divide-y divide-y divide-fuchsia-300 list-none ">
        <article className="p-4 flex space-x-4 font-sans divide-y divide-fuchsia-300">
          <img className="flex-none w-16 h-16 rounded-lg object-cover bg-gray-100" width="72" height="72" src={img} />
          <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
            <h2 className="text-lg font-semibold text-black mb-0.5">{title}</h2>
            <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
              <div>
                <dt className="sr-only">Time</dt>
                <dd>
                  <abbr title={`${format(expire_date, "EEE, dd MMM")} `}>{format(expire_date, "EEE, dd MMM yyyy")}</abbr>
                </dd>
              </div>
              <div className="flex-none w-full mt-0.5 font-normal">
                <dt className="inline">By</dt> <dd className="inline text-black">{body || "".slice(200)}</dd>
              </div>
            </dl>
            {authenticated && (
              <button
                onClick={() => props.onEdit(id)}
                className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1 cursor-pointer"
              >
                <dt className="text-amber-500">
                  <span className="sr-only">Rating</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </dt>
              </button>
            )}
          </div>
          {/* <ListItemSecondaryAction onClick={() => this.props.onEdit(id)}>
              {authenticated && (
                <IconButton aria-label="Comments">
                  <ModeEdit color="primary" />
                </IconButton>
              )}
            </ListItemSecondaryAction> */}
        </article>
      </ul>
    );
  });
};

export default NewsList;
