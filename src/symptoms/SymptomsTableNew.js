import { UserContext } from "globalState/UserProvider";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router";
import { usePersistentState } from "../hooks";
import {
  ALL_SYMPTOMS,
  TOGGLE_STATUS_COMPLETE_MUTATION,
  DELETE_SYMPTOM_REQUEST_MUTATION,
  UPDATE_SYMPTOM_REQUEST_MUTATION,
  UPDATE_SYMPTOM_REQUEST_NOTIFY_MUTATION,
} from "./Queries";
import { format } from "../utils/format";
import { useAlert } from "globalState/AlertContext";
import UpdateSymptomDetails from "./UpdateSymptomDetails";
import SearchBar from "../common/SearchBar";

const PAGE_LENGTH = 15;

const ColumnHeader = ({ name, onSort }) => {
  function handleSortUp() {
    console.log("Clicked up for " + name);
    onSort(name, "A");
  }
  function handleSortDown() {
    console.log("Clicked up for " + name);
    onSort(name, "D");
  }
  return (
    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {name}{" "}
      <span className="hover:text-green hover: cursor-pointer" onClick={handleSortUp}>
        ▲
      </span>
      <span className="hover:text-green hover: cursor-pointer" onClick={handleSortDown}>
        ▼
      </span>
    </th>
  );
};

const Cell = ({ value, complete }) => (
  <td className="px-5 py-0 border border-gray-200 bg-transparent text-sm ">
    {complete === 1 ? <p className="text-gray-900  line-through ">{value}</p> : <p className="text-gray-900 ">{value}</p>}
  </td>
);
const NoteCell = ({ value, complete }) => (
  <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
    <div className="flex text-gray-500 justify-between pointer">
      {complete === 1 ? (
        <p className="text-gray-900 whitespace-no-wrap line-through">{value}</p>
      ) : (
        <p className="text-gray-900 whitespace-no-wrap">{value}</p>
      )}
      <svg
        className="fill-current h-4 w-4 "
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
      </svg>
    </div>
  </td>
);
const NiceCell = ({ value, complete }) => (
  <td className="px-5 py-2 border-b border-gray-200 bg-transparent text-sm">
    {complete === 1 ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-purple-100 text-purple-800 line-through">
        {value}
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800">{value}</span>
    )}
  </td>
);
const CompleteCell = ({ value }) => {
  return (
    <td className="px-5 py-2 border-b border-gray-200 bg-transparent text-sm">
      <div className="flex flex-no-wrap">
        <label className="md:w-2/3 block text-gray-500 font-bold">
          {value === 0 ? (
            <input
              className="mr-2 leading-tight  cursor-pointer transition-colors ease-in-out duration-700 form-checkbox text-green-500"
              defaultChecked={false}
              type="checkbox"
              disabled
              // onClick={handleOpen}
            />
          ) : (
            <input
              className="mr-2 leading-tight cursor-pointer transition-colors ease-in-out duration-200  form-checkbox text-green-500"
              id="x"
              type="checkbox"
              checked={value}
              disabled
              defaultChecked={true}
              // onClick={handleOpen}
            />
          )}
          {/* <span className="text-sm">{value === 0 ? "Completed" : "Not completed"}</span> */}
        </label>
      </div>
    </td>
  );
};

const RemoveCell = ({ handleDelete }) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-blue-700">
      <span onClick={handleDelete} className="cursor-pointer">
        <svg className="fill-current h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
        </svg>
      </span>
    </td>
  );
};

function SymptomsTableNew({ data }) {
  const history = useHistory();
  const alert = useAlert();
  const [toggleStatusComplete] = useMutation(TOGGLE_STATUS_COMPLETE_MUTATION);
  const [isOpen, setisOpen] = useState(false);
  const [handleDeleteSymptomRequest] = useMutation(DELETE_SYMPTOM_REQUEST_MUTATION);
  const [notifySymptomRequest] = useMutation(UPDATE_SYMPTOM_REQUEST_NOTIFY_MUTATION);
  const [updateSymptomRequest] = useMutation(UPDATE_SYMPTOM_REQUEST_MUTATION);
  const [filter, setFilter] = usePersistentState("symptomsfilter", "Open");
  const [_, setSortState] = useState({ name: "", direction: "A" });
  const [requests, setRequests] = useState(data.symptomrequests || []);
  const [values, setValues] = useState(null);

  const [length, setLength] = useState((data.symptomrequests || []).length);
  const [modifiedDate, updateModifiedDate] = useState(Date.now());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user = null } = React.useContext(UserContext);
  // console.log('%c User', 'font-size: 24px', user);
  const VALID_PERMISSIONS = ["ADMIN", "SYMPTOMSEDIT"];
  const canEdit = (user && user.permissions.some(({ permission }) => VALID_PERMISSIONS.includes(permission))) || (user && user.role === "Admin");

  async function toggleCompleteStatus(id, symptom) {
    setisOpen(true);
  }

  const handleEditClick = (item) => {
    if (canEdit) {
      setValues(item);
      setisOpen(true);
    }
  };
  async function handleDelete(id) {
    await handleDeleteSymptomRequest({
      variables: { where: { id } },
      refetchQueries: [{ query: ALL_SYMPTOMS }],
    });
    updateModifiedDate(new Date());
  }
  function filterValues(filter, symptoms, search = "") {
    // console.log(symptoms);
    let ns = symptoms.filter(({ symptom }) => symptom.toLowerCase().includes(search.toLowerCase()));
    // _.includes(sym?.symptom.toUpperCase(), search.toUpperCase()));
    switch (filter) {
      case "Open":
        return ns.filter((s) => s.status === 0); //.filter(s => s.symptom.includes(search));
      case "Completed":
        return ns.filter((s) => s.status === 1); //.filter(s => s.symptom.includes(search));

      default:
        return ns;
    }
  }

  const orderBy = (collection = [], field, dir = "A") => {
    return dir.toLowerCase() === "a"
      ? collection.sort((x, y) => (x[field] > y[field] ? 1 : -1))
      : collection.sort((x, y) => (x[field] > y[field] ? -1 : 1));
  };

  const handleColumnSort = (col) => (name, direction) => {
    const u = direction === "A" ? "asc" : "desc";
    // console.log(requests);
    if (requests) {
      const sorted = orderBy(requests, col, direction);
      console.log("HandleSort", name, direction, u, sorted);
      setRequests(sorted);
      setSortState({ name, direction });
    }
  };

  const isCompleteView = filter === "Completed";

  function handleSearchChange(value) {
    console.log("changed");
    setSearch(value);
  }
  function handleChangeFilter(e) {
    setFilter(e.target.value);
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
  }
  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  let maxPages = parseInt(length / PAGE_LENGTH) + 1;

  useEffect(() => {
    console.log("useEffect called");
    const filtered = filterValues(filter, data.symptomrequests, search);
    setLength(filtered.length);
    maxPages = parseInt(length / PAGE_LENGTH) + 1;

    setRequests(filtered.slice((currentPage - 1) * PAGE_LENGTH, currentPage * PAGE_LENGTH - 1));
  }, [filter, currentPage, modifiedDate, data, search]);

  // console.log(requests);
  return (
    <div className=" bg-gray-200 min-h-full h-screen">
      <div className="flex flex-row mt-4 justify-between items-end bg-white py-4 px-2">
        <div className="relative rounded-lg ">
          <label className="block mt-4">
            <span className="text-gray-700 mr-2 ml-2">Status Filter</span>

            <select name="selectfilter" className="form-select " value={filter} onChange={handleChangeFilter}>
              <option>All</option>
              <option>Open</option>
              <option>Completed</option>
            </select>
          </label>
        </div>
        <SearchBar onChange={(value) => handleSearchChange(value)} hintText="type and press enter to match symptoms.." />

        <div className="mt-2">
          <button
            onClick={() => history.push("/symptoms/add")}
            className="w-72 ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-2 md:py-4 xl:py-3 bg-teal-300 hover:bg-teal-200 md:text-md xl:text-base text-teal-800 font-semibold leading-tight shadow-md"
          >
            Request new Symptom
          </button>
        </div>
      </div>
      <div className="  flex flex-col my-2">
        {/* <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"></div> */}

        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="shadow-lg rounded-lg w-full leading-normal shadow rounded-lg  mt-4 transition duration-500 ease-in-out ">
            <thead>
              <tr>
                <ColumnHeader name="Symptom" onSort={handleColumnSort("symptom")} />
                <ColumnHeader name="Category" onSort={handleColumnSort("symptom_category")} />
                <ColumnHeader name="Email" onSort={handleColumnSort("email")} />
                <ColumnHeader name="Incident" onSort={handleColumnSort("incident")} />
                <ColumnHeader name="Note" onSort={handleColumnSort("note")} />
                <ColumnHeader name="Complete" />
                <ColumnHeader name="Updated" onSort={handleColumnSort("updatedAt")} />
                {isCompleteView && <ColumnHeader name="Remove" />}
              </tr>
            </thead>
            <tbody>
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white hover:bg-gray-100 cursor-pointer"
                  title={canEdit ? "Click to Edit" : ""}
                  onClick={() => handleEditClick(item)}
                >
                  <Cell value={item.symptom} complete={item.status} />
                  <NiceCell value={item.symptom_category} complete={item.status} />
                  <Cell value={item?.email} complete={item?.email} />
                  <Cell value={item.incident} complete={item.status} />
                  <Cell value={item.note} complete={item.status} />
                  <CompleteCell value={item.status} />
                  <Cell value={format(item.updatedAt, "EEE dd MMM yyyy, HH:mm")} complete={item.status} />
                  {isCompleteView && <RemoveCell handleDelete={() => handleDelete(item.id)} />}
                  {/* <Cell value={item.status} /> */}
                </tr>
              ))}
            </tbody>
          </table>
          {isOpen && (
            <UpdateSymptomDetails
              values={values}
              onCancel={() => setisOpen(false)}
              onSave={async (note, status, email) => {
                await updateSymptomRequest({
                  variables: {
                    where: { id: values.id },
                    input: { note, email, status },
                  },
                  refetchQueries: [{ query: ALL_SYMPTOMS }],
                });
                const sendResult = await notifySymptomRequest({
                  variables: {
                    where: { id: values.id },
                  },
                  refetchQueries: [{ query: ALL_SYMPTOMS }],
                });
                console.log(sendResult);
                alert.setMessages(`symptom note was updated to  ${note} ${sendResult?.data?.notifySymptomRequest}`);
                setisOpen(false);
              }}
              onComplete={async () => {
                await toggleStatusComplete({
                  variables: { where: { id: values.id } },
                  refetchQueries: [{ query: ALL_SYMPTOMS }],
                });
                alert.setMessage(`symptom ${values.symptom} was marked complete/incomplete`);
                // updateModifiedDate(new Date());
              }}
            />
          )}
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing {(currentPage - 1) * PAGE_LENGTH + 1} to {currentPage * PAGE_LENGTH} of {length} Entries
            </span>
            <div className="inline-flex ml-2 xs:mt-0">
              {currentPage}/{maxPages}
              <button
                disabled={currentPage === 1}
                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 btn-tw font-semibold font-sansI"
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                disabled={currentPage >= maxPages}
                className="text-sm bg-teal-300 ml-2 hover:bg-gray-400 text-teal-800 btn-tw "
                onClick={handleNext}
              >
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
