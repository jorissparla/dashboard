import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "utils/Loader";
import SearchBar from "common/SearchBar";

const ALL_TRAININGROUPS = gql`
  query ALL_TRAINING_GROUPS {
    traininggroups {
      id
      name
      description
    }
    accounts(teams: ["LOG", "FIN", "TLS"], region: "EMEA") {
      id
      fullname
      groups
    }
  }
`;

function TrainingGroups() {
  // const tg = ["Dist", "Warehousing", "Manufacturing"];
  const [tg, setTg] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState("Dist");
  const [searchText, setSearchText] = useState("");
  const { data, loading } = useQuery(ALL_TRAININGROUPS);
  useEffect(
    () => {
      if (data) {
        setTg(data.traininggroups);
        if (searchText) {
          console.log(searchText);
          setAccounts(data.accounts.filter(({ fullname }) => fullname.includes(searchText)));
        } else {
          console.log(searchText);
          setAccounts(data.accounts);
        }
      }
    },
    data,
    searchText,
    selected
  );

  if (loading) {
    return <Loader />;
  }

  const handleGroupClick = (item) => {
    if (selected === item) {
      setSelected("");
    } else {
      setSelected(item);
    }
  };
  const handleAccountClick = (item) => {
    if (selected === item) {
      setSelected("");
    } else {
      setSelected(item);
    }
  };
  return (
    <div className="h-screen bg-gray-100">
      <div className=" flex  max-w-full items-start justify-between m-2 bg-white shadow-lg h-full">
        <div className="flex flex-col">
          <div className="max-w-full w-full">Selection</div>
          <div className="border border-teal-300 w-full mr-2 p-2 flex">
            {tg.map(({ name: item }) => (
              <Button selected={selected === item} onClick={() => handleGroupClick(item)}>
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="max-w-full w-full">Selection</div>
          <SearchBar hintText="enter name or part of name" onChange={(value) => setSearchText(value)} />
          <div className="border border-teal-300 w-full mr-2 p-2 flex flex-wrap">
            {accounts.map(({ fullname }) => (
              <SelectedAccountBadge fullname={fullname}></SelectedAccountBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = ({ children = "text", selected = false, onClick }) => {
  if (selected) {
    return (
      <div type="button" className="bg-purp font-pop m-2 px-2 py-2 text-white rounded-sm uppercase font-bold cursor cursor-pointer" onClick={onClick}>
        {children}
      </div>
    );
  }
  return (
    <div type="button" className="bg-teal-400 font-pop m-2 px-2 py-2 text-teal-700 rounded-sm uppercase font-bold cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

const SelectedAccountBadge = ({ id, fullname }) => {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800 mx-1 my-1">
      {fullname}
      <button
        type="button"
        className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700 cursor-pointer"
        aria-label="Remove large badge"
      >
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </span>
  );
};

{
  /* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> */
}

{
  /* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */
}
export default TrainingGroups;
