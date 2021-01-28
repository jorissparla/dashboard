import { useQuery, gql } from "@apollo/client";
import InputTags from "common/InputTags";
import Modal from "elements/ModalComponent";
import TWButton, { TWHyperLink } from "elements/TWButton";
import React, { useState } from "react";
import Spinner from "utils/spinner";

const ALL_SUMOLOGS_QUERY = gql`
  query ALL_SUMOLOGS_QUERY {
    sumologs {
      id
      creator
      created
      week
      query
    }
  }
`;

const Sumo = () => {
  const [isShowingAdd, showAdd] = useState(false);
  const { data, loading } = useQuery(ALL_SUMOLOGS_QUERY);
  function toggleShow() {
    showAdd(false);
  }
  if (loading) return <Spinner />;
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg leading-6 font-medium text-black">Projects</h2>
        <button className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2 mx-1">
          <svg className="group-hover:text-light-blue-600 text-light-blue-500 mr-2" width="12" height="20" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          New
        </button>
      </header>
      <input type="week" className="form-input" />
      <InputTags values={["Enterprise"]} onChange={(v) => console.log(v)} readOnly={false} />
      <form className="relative">
        <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text"
          aria-label="Filter projects"
          placeholder="Filter projects"
        />
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 list-none">
        {data.sumologs.map((item) => (
          <li x-for="item in items">
            <a
              href="item.url"
              className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200 no-underline"
            >
              <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <div>
                  <dt className="sr-only">Title</dt>
                  <dd className="group-hover:text-white leading-6 font-medium text-black">{item.creator}</dd>
                </div>
                <div>
                  <dt className="sr-only">Week</dt>
                  <dd className="group-hover:text-white leading-6 font-semibold text-black">{item.week}</dd>
                </div>
                <div>
                  <dt className="sr-only">Category</dt>
                  <dd className="group-hover:text-light-blue-200 text-sm font-mono sm:mb-4 lg:mb-0 xl:mb-4">{item.query}</dd>
                </div>
                <div className="col-start-2 row-start-1 row-end-3">
                  <dt className="sr-only">Users</dt>
                  <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                    {/* <img x-for="user in item.users" :src="user.avatar" :alt="user.name" width="48" height="48" className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white" /> */}
                  </dd>
                </div>
              </dl>
            </a>
          </li>
        ))}
        <li className="hover:shadow-lg flex rounded-lg">
          <a
            href="/addsumo"
            className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
          >
            New Project
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sumo;
