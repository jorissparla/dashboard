import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import ModeEdit from "@material-ui/icons/Edit";
import NewIcon from "@material-ui/icons/NewReleases";
import ViewIcon from "@material-ui/icons/Pageview";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Block } from "../elements/Block";
import Button from "../elements/TWButton";
import NumberOfViews from "../pages/NumberOfViews";
import { HR, Papier } from "../styles/index.js";
import { ToggleFavorite } from "../supportcard/Favorite";
import { format } from "../utils/format";

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SmallCard = ({
  title = "Procedure",
  text = "Papier Und KartonFabrik",
  buttonText = "Modify",
  category = "Cloud",
  link = "https://www.google.com",
  action = null,
  color = "#FFFFF",
  textcolor = "#000",
  canEdit = false,
  editLink = "",
  accessed = 0,
  viewLink = "",
  isNew = false,
  isFavorite = false,
  account_id = null,
  supportcard_id = null,
  updatedAt = null,
  keywords = "",
  id = { id },
  onTitleClick = () => null,
  onToggleFavorite = () => {},
  onAudit = () => console.log("onaudit"),
  onFollowLink = (link) => {
    console.log("onFollowLink");
    return link;
  },
}) => {
  const images = {
    cloud: "https://nlbavwixs.infor.com/images/background/cloud.jpg",
    development: "https://nlbavwixs.infor.com/images/background/dev2.png",
    ixs: "https://nlbavwixs.infor.com/images/background/ixs.png",
    localizations: "https://nlbavwixs.infor.com/images/background/localizations.jpg",
  };
  const image = images[category.toLowerCase()] || "https://nlbavwixs.infor.com/images/background/nice.png";

  const kw = keywords
    ? keywords
        .trim()
        .split(";")
        .map((t) => t.trim())
        .slice(0, 3)
    : [];
  return (
    <div className="w-full max-w-sm ">
      <div style={{ backgroundImage: `linear-gradient(to bottom right, ${color}, white)` }} className="rounded-lg  m-3  shadow-lg">
        <div>
          <img className="object-cover h-16 w-full border-b border-gray-300" src={image} alt="" />
        </div>
        <div className=" pb-2">
          <div className="px-3 text-xl overflow-hidden truncate font-bold font-nice text-gray-700" title={title}>
            {title}
          </div>

          <div className="px-3 flex items-center">
            <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
            </svg>
            <span className="px-3 mt-2 text-sm tracking-wide text-gray-600">Last updated: {format(updatedAt, "EEE dd MMM yyyy, hh:mm")}</span>
          </div>
          <div className="px-3 mt-2">
            <span className="mr-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-100 text-teal-800">
              {category}
            </span>
            {kw.map((k) => (
              <span
                key={k}
                className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-purple-100 text-purple-800"
              >
                {k}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-300  w-full mt-2 "></div>
          <div className="px-3 flex justify-between items-center mt-4">
            <a href={editLink} onClick={(e) => onAudit(editLink)}>
              {canEdit === true ? <Button>Open</Button> : <Button color="teal">View</Button>}
            </a>
            {link && (
              <a
                target="_blank_"
                href={link}
                onClick={() => onFollowLink(viewLink, link)}
                className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
              >
                Open Link
              </a>
            )}
            <NumberOfViews linkid={supportcard_id} accessed={accessed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <Outer>
      <SmallCard />
      <SmallCard />
      <SmallCard />
    </Outer>
  );
};

export { SmallCard };
