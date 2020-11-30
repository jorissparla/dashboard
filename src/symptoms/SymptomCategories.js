import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "utils/spinner";
import { TWSelectMenu } from "elements/TWSelectMenu";
import SearchBar from "common/SearchBar";
import { usePersistentState } from "hooks";
import TWButton, { TWHyperLink } from "elements/TWButton";
import { format } from "utils/format";

const SYMPTOM_CAT_QUERY = gql`
  query SYMPTOM_CAT_QUERY {
    categories: symptom_categories {
      id
      symptom_category
    }
    symptoms {
      date
      symption_id
      symptom
      symptom_category
    }
  }
`;

const SymptomCategories = () => {
  const [selectedCategory, setSelectedCategory] = usePersistentState("");

  const [searchText, setSearchText] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { loading, data } = useQuery(SYMPTOM_CAT_QUERY);

  useEffect(() => {
    let initialSelectedCategory;
    if (data && data.categories) {
      if (categories?.length === 0) {
        setCategories([{ id: -1, symptom_category: "All" }, ...data.categories]);
        initialSelectedCategory = data.categories[0]?.symptom_category;
        setSelectedCategory(initialSelectedCategory);
      }

      let filteredData = data.symptoms
        .filter((s) => !s.symptom.startsWith("zz"))

        .filter((symptom) => symptom.symptom.toUpperCase().includes(searchText.toUpperCase()));
      if (selectedCategory !== "All") {
        filteredData = filteredData.filter((symptom) => symptom.symptom_category === selectedCategory || initialSelectedCategory);
      }
      console.log({ filteredData });
      setDisplayData(filteredData);
    }
  }, [selectedCategory, data, searchText]);

  if (loading) return <Spinner />;

  const handleChangeSearchText = (v) => {
    console.log("changed", v);
    setSearchText(v);
  };
  // const { categories, symptoms } = data;
  return (
    <div class="h-screen  max-w-full bg-gray-50">
      <div className="py-4 flex  ml-8">
        <h1 className=" font-pop font-semibold text-lg mb-4">Symptom Categories</h1>
        <span className="ml-8 text-sm text-gray-600">on this page your can find all available symptoms by category</span>
      </div>
      <div className="pr-8 mx-7 w-full flex items-center justify-between">
        {data?.categories?.length > 0 ? (
          <>
            <TWSelectMenu
              items={categories.map((c) => c.symptom_category).sort()}
              onChange={(v) => setSelectedCategory(v)}
              label="Category"
              value={selectedCategory}
              wide
            />
            <div class="ml-5  flex p-2 bg-white overflow-hidden shadow rounded-lg w-48">
              <dl>
                <dt class="text-sm leading-5 font-medium text-gray-500 truncate">Total Symptoms</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">{data.symptoms.length}</div>
                </dd>
              </dl>
            </div>
            <div class="ml-5 w-96 flex p-2 bg-white overflow-hidden shadow rounded-lg">
              <dl>
                <dt class="text-sm leading-5 font-medium text-gray-500 truncate">Last Updated </dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">{format(data.symptoms[0].date, "EEE dd MMM yyyy, HH:mm")}</div>
                </dd>
              </dl>
            </div>
          </>
        ) : (
          <div class="rounded-md bg-yellow-50 p-4 w-1/2">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm leading-5 font-medium text-yellow-800">No data seems to be loaded</h3>
                <div class="mt-2 text-sm leading-5 text-yellow-700 font-semibold">
                  <p>Contact your system administrator!</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <TWHyperLink link="/symptomkbs">To Symptom KBS</TWHyperLink>
      </div>
      <div>
        <SearchBar onChange={handleChangeSearchText} hintText="type part of symptom in selected category to filter on..." />
      </div>
      <div className="mt-4 mx-7 bg-gray-50 h-screen w-full">
        {displayData.map((item) => (
          <div className="ml-4 font-sans text-gray-600">{item.symptom}</div>
        ))}
      </div>
    </div>
  );
};

export default SymptomCategories;
