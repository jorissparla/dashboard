import React from "react";
import _ from "lodash";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ColumnHeader = ({ label, onSort = () => null }) => {
  function handleSortUp() {
    console.log("Clicked up for " + label);
    onSort(label, "A");
  }
  function handleSortDown() {
    console.log("Clicked down for " + label);
    onSort(label, "D");
  }
  return (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {label}{" "}
      <span className="hover:text-green hover: cursor-pointer" onClick={handleSortUp}>
        ▲
      </span>
      <span className="hover:text-green hover: cursor-pointer" onClick={handleSortDown}>
        ▼
      </span>
    </th>
  );
};

const TableHeader = ({ label }) => (
  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
    {label}
  </th>
);

const TableCell = ({ value }) => <td className="px-6 py-4 whitespace-nowrap text-sm leading-5  text-gray-900">{value}</td>;

const TableRow = ({ children, odd }) => {
  console.log(odd);
  if (odd) {
    return <tr className="bg-blue-150">{children}</tr>;
  } else return <tr className="bg-gray-100">{children}</tr>;
};

// const TableRow.Odd = TableRowOdd

const cols = ["name", "title", "email", "number"];

const TableComponent = ({ data, cols }) => {
  const [sortedData, setSortedData] = React.useState(data);

  const handleColumnSort = (col) => (name, direction) => {
    const u = direction === "A" ? "asc" : "desc";
    const sorted = _.orderBy(sortedData, [col], [u]);
    console.log("HandleSort", name, direction, u, sorted);
    setSortedData(sorted);
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                {cols.map((col) => (
                  <ColumnHeader key={col} label={col} onSort={handleColumnSort(col)} />
                ))}

                {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" /> */}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <TableRow key={index} odd={index % 2 === 0}>
                  {cols.map((col) => (
                    <TableCell key={col} value={row[col]} />
                  ))}
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// const Result = () => <Comp data={data} cols={cols} />;
export default TableComponent;
