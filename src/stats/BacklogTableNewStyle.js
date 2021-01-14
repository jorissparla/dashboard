import { GenericTable } from "elements/GenericTable";
import React from "react";

const defaultFields = [
  { name: "incident", title: "Incident", type: "hl" },
  { name: "severityname", title: "Severity", type: "sev" },
  { name: "escalated", title: "Esc", type: "yn" },
  { name: "customername", title: "Customer", type: "" },
  { name: "owner", title: "Owner", type: "" },

  { name: "status", title: "status", type: "" },
  { name: "dayssincelastupdate", title: "Updated", type: "number" },
  { name: "daysSinceCreated", title: "Created", type: "number" },
  { name: "title", title: "Summary", type: "" },
];

function calculateAverageAgeFromData(data, ageColumn = "daysSinceCreated") {
  const sum = data.reduce((total, item) => total + item[ageColumn], 0);
  // console.log("sum", sum, data[0], ageColumn);
  const avg = (sum / (data.length || 0 + 1)).toFixed(0);
  return avg;
}

function filterBacklogData(data = [], filterValues = { owner: "", products: ["LN"], region: "EMEA" }, fieldFilters) {
  const { owner, products, region } = filterValues;
  let correctedRegion = region === "All" ? "" : region;
  let mydata = [...data];
  if (data?.length > 0) {
    if (filterValues) {
      mydata = data && owner ? data.filter((o) => o.owner === owner) : data;
      mydata = products.length ? mydata.filter((o) => products.includes(o.productline)) : mydata;
      mydata = correctedRegion ? mydata.filter((o) => o.owner_region === correctedRegion) : mydata;
    }
    for (let [key, value] of Object.entries(fieldFilters)) {
      if (value) {
        mydata = mydata.filter((item) => {
          if (typeof item[key] === "number") return item[key] >= value;
          return item[key]?.includes(value);
        });
      }
    }
  }
  return mydata;
}

const BacklogTable = (props) => {
  return (
    <GenericTable
      fields={defaultFields}
      whereToInsertAdditionalFieldIndex={5}
      fnCalculateAverageAgeFromData={calculateAverageAgeFromData}
      ageColumn={"daysSinceCreated"}
      fnFilterData={filterBacklogData}
      filterValues={{ owner: "", products: ["LN"], region: "EMEA" }}
      {...props}
    />
  );
};

export default BacklogTable;
