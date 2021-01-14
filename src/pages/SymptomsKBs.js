import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import SearchBar from "common/SearchBar";
import _ from "lodash";
import { TWHyperLink } from "elements/TWButton";
import { format } from "utils/format";

const SYMPTOM_KB_QUERY = gql`
  query SYMPTOM_KB_QUERY {
    symptomKBS {
      id
      date
      category
      symptom
      kb
      title
    }
  }
`;

const SymptomsKBs = () => {
  const [searchText, setSearchText] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [groupedSymptoms, setGroupedSymptoms] = useState([]);
  const { data, loading } = useQuery(SYMPTOM_KB_QUERY);

  const groupBy = (items, key) => {
    console.log("key", key);
    return items.slice().reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );
  };

  const kbsBySymptom = (data) =>
    _.chain(data)
      .sortBy((o) => o.symptom)
      .groupBy(function (g) {
        return g.symptom;
      })
      .map((k) => k)
      .value();

  const filterData = (data, text) =>
    !text
      ? data.slice(0, 0)
      : data.filter((item) => item.category.toUpperCase().includes(text.toUpperCase()) || item.symptom.toUpperCase().includes(text.toUpperCase()));

  useEffect(() => {
    if (data) {
      // const temp = filterData(data.symptomKBS.slice(), searchText).sort((x, y) => (x.category > y.category ? 1 : -1));
      const temp = kbsBySymptom(filterData(data.symptomKBS, searchText));
      // console.log("useEffect", temp);
      setDisplayData(temp);
      // const grp = ;
      // console.log("grp", grp);
      setGroupedSymptoms(temp);
    }
  }, [searchText, data]);
  if (loading) return <Spinner />;

  const handleSearchChange = (text) => setSearchText(text);
  console.log(searchText, groupedSymptoms, data);
  // console.log(groupedSymptoms);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="w-3/4">
          <SearchBar onChange={handleSearchChange} hintText="Type part of a symptom or category to show results" />
        </div>
        {data?.symptomKBS?.length > 0 && (
          <div className="flex">
            <div className="ml-5  flex p-2 bg-white overflow-hidden shadow-sm rounded-lg w-48">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total Symptom KBs</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl leading-8 font-semibold text-gray-900">{data.symptomKBS.length}</div>
                </dd>
              </dl>
            </div>
            <div className="ml-5 w-96 flex p-2 bg-white overflow-hidden shadow-sm rounded-lg">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Last Updated </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl leading-8 font-semibold text-gray-900">{format(data.symptomKBS[0].date, "EEE dd MMM yyyy, HH:mm")}</div>
                </dd>
              </dl>
            </div>
          </div>
        )}
        <div className="w-1/6">
          <TWHyperLink link="/symptomcategories" color="pink" className="w-full">
            Symptom Definitions
          </TWHyperLink>
        </div>
      </div>
      {groupedSymptoms.length === 0 && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm leading-5 font-medium text-yellow-800">No results</h3>
              <div className="mt-2 text-sm leading-5 text-yellow-700">
                <p>Change or enter different search terms</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {groupedSymptoms.map((item) => (
        <div className="mt-2 ml-8">
          <h2 className="ml-2 font-sans font-semibold text-gray-700">
            {item[0].symptom} - <span className="pl-2">{item[0].category}</span>
          </h2>
          {item.map((entry) => (
            <div className="ml-4 font-sans text-gray-600">
              <li className="list-none">
                <a
                  target="_blank_"
                  href={`https://support.infor.com/espublic/EN/AnswerLinkDotNet/SoHo/Solutions/SoHoViewSolution.aspx?SolutionID=${entry.kb}`}
                >
                  {entry.kb}
                </a>
                <span className="px-2">{entry.title}</span>
              </li>
            </div>
          ))}
        </div>
      ))}
      {/* {!searchText && <span>Displaying first 10 records only</span>} */}
      {/*{" "}
      {displayData.map((sk) => (
        <li>
          {sk.category} -{sk.symptom}-{sk.kb} -{sk.title}
        </li>
      ))}{" "}
      */}
    </div>
  );
};

export default SymptomsKBs;
