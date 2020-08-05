import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import SearchBar from "common/SearchBar";
import _ from "lodash";

const SYMPTOM_KB_QUERY = gql`
  query SYMPTOM_KB_QUERY {
    symptomKBS {
      id
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
  console.log(searchText, groupedSymptoms);
  // console.log(groupedSymptoms);

  return (
    <div>
      <SearchBar onChange={handleSearchChange} hintText="Type part of a symptom or category to show results" />
      {groupedSymptoms.length === 0 && (
        <div class="rounded-md bg-yellow-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm leading-5 font-medium text-yellow-800">No results</h3>
              <div class="mt-2 text-sm leading-5 text-yellow-700">
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
