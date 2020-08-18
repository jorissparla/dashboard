import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "utils/spinner";
import { TWSelectMenu } from "elements/TWSelectMenu";
import SearchBar from "common/SearchBar";
import { usePersistentState } from "hooks";
import TWButton, { TWHyperLink } from "elements/TWButton";

const SYMPTOM_CAT_QUERY = gql`
  query SYMPTOM_CAT_QUERY {
    categories: symptom_categories {
      id
      symptom_category
    }
    symptoms {
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
    if (data) {
      if (categories.length === 0) {
        setCategories(data.categories);
        initialSelectedCategory = data.categories[0].symptom_category;
        setSelectedCategory(initialSelectedCategory);
      }

      const filteredData = data.symptoms
        .filter((symptom) => symptom.symptom_category === selectedCategory || initialSelectedCategory)
        .filter((symptom) => symptom.symptom.toUpperCase().includes(searchText.toUpperCase()));
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
    <div class="h-screen  max-w-full">
      <h1 className=" font-pop font-semibold text-lg mb-4">Symptom Categories</h1>
      <div className="pr-8 mx-7 w-full flex items-center justify-between">
        <TWSelectMenu
          items={categories.map((c) => c.symptom_category).sort()}
          onChange={(v) => setSelectedCategory(v)}
          label="Category"
          value={selectedCategory}
          wide
        />
        
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
