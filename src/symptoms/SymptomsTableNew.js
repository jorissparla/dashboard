import { UserContext } from 'globalState/UserProvider';
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router';
import { usePersistentState } from '../hooks';
import { ALL_SYMPTOMS, TOGGLE_STATUS_COMPLETE_MUTATION } from './Queries';
import { format } from '../utils/format';

const ColumnHeader = ({ name }) => (
  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {name}
  </th>
);

const Cell = ({ value, complete }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    {complete === 1 ? (
      <p className="text-gray-900 whitespace-no-wrap line-through">{value}</p>
    ) : (
      <p className="text-gray-900 whitespace-no-wrap">{value}</p>
    )}
  </td>
);
const CompleteCell = ({ value, handleClick, canEdit = false }) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div className="flex">
        <label className="md:w-2/3 block text-gray-500 font-bold">
          {value === 0 ? (
            <input
              className="mr-2 leading-tight bg-red-300 cursor-pointer transition-colors ease-in-out duration-700"
              checked={false}
              type="checkbox"
              onClick={canEdit && handleClick}
            />
          ) : (
            <input
              className="mr-2 leading-tight cursor-pointer transition-colors ease-in-out duration-200 "
              id="x"
              type="checkbox"
              checked
              onClick={canEdit && handleClick}
            />
          )}
          <span className="text-sm">Done!</span>
        </label>
      </div>
    </td>
  );
};

const RemoveCell = () => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-blue-700">
      <span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
        </svg>
      </span>
    </td>
  );
};

function SymptomsTableNew({ data }) {
  const history = useHistory();
  const [toggleStatusComplete] = useMutation(TOGGLE_STATUS_COMPLETE_MUTATION);
  const [filter, setFilter] = usePersistentState('symptomsfilter', 'All');
  const [search, setSearch] = useState('');
  const { user = null } = React.useContext(UserContext);
  // console.log('%c User', 'font-size: 24px', user);
  const VALID_PERMISSIONS = ['ADMIN', 'SYMPTOMSEDIT'];
  const hasEditPermssion =
    (user && user.permissions.some(({ permission }) => VALID_PERMISSIONS.includes(permission))) ||
    user.role === 'Admin';

  async function toggleCompleteStatus(id) {
    const result = await toggleStatusComplete({
      variables: { where: { id } },
      refetchQueries: [{ query: ALL_SYMPTOMS }]
    });
  }

  function filterValues(filter, symptoms, search) {
    switch (filter) {
      case 'Open':
        return symptoms.filter(s => s.status === 0); //.filter(s => s.symptom.includes(search));
        break;
      case 'Completed':
        return symptoms.filter(s => s.status === 1); //.filter(s => s.symptom.includes(search));
        break;

      default:
        return symptoms;
        break;
    }
  }

  const isCompleteView = filter === 'Completed';
  const requests = filterValues(filter, data.symptomrequests);

  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleChangeFilter(e) {
    setFilter(e.target.value);
  }
  return (
    <div className=" bg-gray-200 min-h-full h-screen">
      <div className="flex flex-row mt-4 justify-between items-center bg-white py-4 px-2">
        <div class="relative rounded-lg ">
          <select
            name="selectfilter"
            class="border-gray-200 border appearance-none h-full block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight  focus:border-gray-500"
            value={filter}
            onChange={handleChangeFilter}
          >
            <option>All</option>
            <option>Open</option>
            <option>Completed</option>
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
            name="search"
            value={search}
            onChange={handleChange}
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
      <div className="  flex flex-col my-2">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"></div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="shadow-lg rounded-lg w-full leading-normal shadow rounded-lg  mt-4 transition duration-500 ease-in-out ">
            <thead>
              <tr>
                <ColumnHeader name="Symptom" />
                <ColumnHeader name="Category" />
                <ColumnHeader name="Incident" />
                <ColumnHeader name="Complete" />
                <ColumnHeader name="Updated" />
                {isCompleteView && <ColumnHeader name="Remove" />}
              </tr>
            </thead>
            <tbody>
              {requests.map(item => (
                <tr key={item.id}>
                  <Cell value={item.symptom} complete={item.status} />
                  <Cell value={item.symptom_category} complete={item.status} />
                  <Cell value={item.incident} complete={item.status} />
                  <CompleteCell
                    value={item.status}
                    handleClick={() => toggleCompleteStatus(item.id)}
                    canEdit={hasEditPermssion}
                  />
                  <Cell
                    value={format(item.updatedAt, 'EEE dd MMM yyyy, HH:mm')}
                    complete={item.status}
                  />
                  {isCompleteView && <RemoveCell />}
                  {/* <Cell value={item.status} /> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span class="text-xs xs:text-sm text-gray-900">
              Showing 1 to 10 of {requests.length} Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomsTableNew;
