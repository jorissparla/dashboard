import { useQuery } from "@apollo/client";
import ReprodPin from "@material-ui/icons/Build";
import AllPin from "@material-ui/icons/ClearAll";
import CloudPin from "@material-ui/icons/Cloud";
import DeveloperPin from "@material-ui/icons/DeveloperMode";
import FlagIcon from "@material-ui/icons/Flag";
import SatPin from "@material-ui/icons/ThumbUp";
import gql from "graphql-tag";
import React, { useState } from "react";

const IconMapper = (label) => {
  switch (label) {
    case "Cloud":
      return <CloudPin />;
    case "Development":
      return <DeveloperPin />;
    case "Reproduction":
      return <ReprodPin />;
    case "Localizations":
      return <FlagIcon />;
    case "CustomerSat":
      return <SatPin />;
    case "All":
      return <AllPin />;
    default:
      return <div />;
  }
};

const CategoryTabs = ({ onChange, onSave }) => {
  const [selected, setSelected] = useState("All");
  const { data, loading } = useQuery(CategoryQuery);

  if (loading) {
    return <p>Loading ...</p>;
  }
  const { error, categories } = data;
  if (error) {
    return <p>{error.message}</p>;
  }

  const handleChangeSelection = (val) => {
    if (val === "All") {
      setSelected("All");
      onChange("");
    } else {
      setSelected(val);
      onChange(val);
    }
  };
  const cats = [{ id: "", name: "All" }, ...categories];
  return (
    <div className="bg-white">
      <div className="sm:hidden">
        <select className="form-select block w-full" defaultValue={selected}>
          {cats.map(({ id, name }) => (
            <option key={id}>{name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {cats.map(({ id, name }) => {
              if (selected !== name) {
                return (
                  <a
                    href="#"
                    key={id}
                    onClick={() => handleChangeSelection(name)}
                    className="no-underline ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
                  >
                    {IconMapper(name)}

                    <span className="ml-2">{name}</span>
                  </a>
                );
              } else
                return (
                  <a
                    href="#"
                    key={id}
                    onClick={() => handleChangeSelection(name)}
                    className="no-underline ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700"
                  >
                    {IconMapper(name)}

                    <span className="ml-2">{name}</span>
                  </a>
                );
            })}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="sm:hidden">
        <select className="form-select block w-full">
          <option>My Account</option>
          <option>Company</option>
          <option selected>Team Members</option>
          <option>Billing</option>
        </select>
      </div>
      {/* <Tabs value="All" onChange={(e, v) => onChange(v)}> */}
      {/* <Tab key="2ddgdfgdgt534" label="All" value="All" icon={<AllPin />} /> */}
      <div className="hidden sm:block">
        <nav className="flex -mb-px">
          {categories.map(({ id, name }) => (
            <a
              href="#"
              key={id}
              className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
            >
              {IconMapper(name)}
              <span>{name}</span>
            </a>
            // <Tab key={id} label={name} value={name} icon={IconMapper(name)} />
          ))}
        </nav>
      </div>
      {/* </Tabs> */}
    </div>
  );
};

const CategoryQuery = gql`
  query allCategories {
    categories {
      id
      name
    }
  }
`;
export default CategoryTabs;
