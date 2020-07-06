import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "utils/spinner";
import SearchBar from "common/SearchBar";
import { format } from "date-fns";
import { useUserContext } from "globalState/UserProvider";
import TWButton from "elements/TWButton";

const QUERY_ALL_PROJECTS = gql`
  query QUERY_ALL_PROJECTS {
    projects {
      id
      title
      comments
      lead
      members
      status
      startdate
      keywords
    }
  }
`;

const Projects = () => {
  const { data, loading } = useQuery(QUERY_ALL_PROJECTS);
  const { user } = useUserContext();
  if (loading) return <Spinner />;
  const roles = ["ADMIN", "PROJECTEDIT"];
  const editable = user ? user?.role === "ADMIN" || user.permissions.filter((u) => roles.includes(u.permission)) : false;
  const { projects } = data;
  return (
    <div className=" w-full bg-gray-100 max-h-full h-screen ">
      <div className="w-full  bg-white border-b border-gray-300 pb-2 flex items-center mb-2">
        <span className="px-2 font-semibold">Projects</span>{" "}
        <SearchBar onChange={() => console.log("x")} searchOnEnter={true} hintText="Search Project " />
        {editable && (
          <a
            href="/projects/add"
            className="rounded-lg font-sans no-underline mr-4 px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-teal-500 hover:bg-teal-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
          >
            New
          </a>
        )}
      </div>
      {/* <pre>{JSON.stringify(user)}</pre> */}
      <div className="font-sans grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 col-gap-4 row-gap-2 px-2 ">
        {/* <div className="col-span-5 mb-6">
        <span className="text-lg font-semibold  px-3 py-3 m-4">Projects</span>
      </div> */}

        {/* <div className="col-span-2  ml-2 overflow-y-scroll">
        {new Array(30).fill("").map((x) => (
          <div className="border-gray-200 border-b">
            <div className="text-blue-600">345E5708-12D6-4A44-BEEF-CFE53F7BAED3</div>
            <div className="text-sm">Financial impact of GTM in Logistics</div>
          </div>
        ))}
      </div> */}
        {[...projects].map((p) => (
          <div className="col-span-3 border-blue-300 border-l-8 bg-gray-150  " key={p.id}>
            <div className=" rounded shadow-xl bg-white text-gray-600 h-72 max-h-72 heropattern-floatingcogs-cool-gray-100 overflow-hidden ellipsis pb-2">
              <div className=" font-semibold  -mx-2 px-4 flex pt-2 justify-between">
                {editable ? <a href={`projects/update/${p.id}`}>{p.title}</a> : <span>{p.title}</span>}
                <span className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                  {p.status}
                </span>
              </div>

              <div label="Details">
                <div className="pt-2 px-4 text-sm sm:max-h-12 h-12 md:max-h-18 text-teal-700 overflow-hidden">{p.comments}</div>
                <div className="w-full text-sm">
                  <div className="py-2 px-2 flex flex-wrap">
                    {p.members.split(";").map((m) => (
                      <span
                        key={m}
                        className="mx-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="mx-4 flex items-center text-sm py-1 px-1 rounded w-18 my-3 bg-teal-300 text-teal-600">
                  <span className="w-4 h-4">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                  <span className="mx-1 text-xs font-semibold">{format(parseInt(p.startdate), "dd MMM")}</span>
                </div>
              </div>
              <div>
                {p.keywords &&
                  p.keywords?.split(";").map((k) => (
                    <span
                      key={k}
                      className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-purple-100 text-purple-800"
                    >
                      {k}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

const ExpandField = ({ label = "Title", children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !isOpen);
  return (
    <div className="flex flex-col">
      <div className="flex items-center ">
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:bg-gray-50" onClick={toggle}>
            <g fill="none" fill-rule="evenodd">
              <path
                d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
                fill="#344563"
              ></path>
            </g>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:bg-gray-50 transform -rotate-90" onClick={toggle}>
            <g fill="none" fill-rule="evenodd">
              <path
                d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
                fill="#344563"
              ></path>
            </g>
          </svg>
        )}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {isOpen && <span className="mx-4 text-sm">{children}</span>}
    </div>
  );
};
