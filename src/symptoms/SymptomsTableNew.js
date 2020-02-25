import React from 'react';
import { useHistory } from 'react-router';

const ColumnHeader = ({ name }) => (
  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {name}
  </th>
);

const Cell = ({ value }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">{value}</p>
  </td>
);
const CompleteCell = ({ value }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <label className="md:w-2/3 block text-gray-500 font-bold">
      <input className="mr-2 leading-tight" type="checkbox" />
      <span className="text-sm">Done!</span>
    </label>
  </td>
);

function SymptomsTableNew({ data }) {
  const requests = data.symptomrequests;
  const history = useHistory();
  console.log(requests);
  return (
    <div className=" bg-gray-200 min-h-full ">
      <div className="flex flex-row m-4 justify-between items-center">
        <div class="relative rounded">
          <select class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex rounded items-center px-2 text-gray-700">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div class="block relative mt-2">
          <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
        <div className="mt-2">
          <button
            onClick={() => history.push('/symptoms/add')}
            class="ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-2 md:py-4 xl:py-3 bg-gray-300 hover:bg-gray-200 md:text-md xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
          >
            Request new Symptom
          </button>
        </div>
      </div>
      <div className="  shadow rounded-lg  flex flex-col mb-4 ml-4">
        <table className="w-full leading-normal mb-4 mt-4 ">
          <thead>
            <tr>
              <ColumnHeader name="Symptom" />
              <ColumnHeader name="Category" />
              <ColumnHeader name="Incident" />
              <ColumnHeader name="Complete" />
            </tr>
          </thead>
          <tbody>
            {requests.map(item => (
              <tr key={item.id}>
                <Cell value={item.symptom} />
                <Cell value={item.symptom_category} />
                <Cell value={item.incident} />
                <CompleteCell />
                {/* <Cell value={item.status} /> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SymptomsTableNew;
