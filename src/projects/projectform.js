import React, { useState, useEffect } from "react";
import TWButton from "elements/TWButton";
import Keywords from "supportcard/SupportCardTags";
import { useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";

const ACCOUNTS = gql`
  query ACCOUNTS {
    supportfolks {
      fullname
      image
    }
  }
`;
const MUTATION_UPDATE_PROJECT = gql`
  mutation MUTATION_UPDATE_PROJECT($input: UpdateProjectType, $where: WhereProject) {
    updateproject(where: $where, input: $input) {
      id
      title
      comments
      lead
      members
      status
      startdate
      keywords
    }
  }
`;

const MUTATION_ADD_PROJECT = gql`
  mutation MUTATION_ADD_PROJECT($input: InputProjectType) {
    addproject(input: $input) {
      id
      title
      comments
      lead
      members
      status
      startdate
      keywords
    }
  }
`;

const QUERY_SINGLE_PROJECT = gql`
  query QUERY_SINGLE_PROJECT($id: ID) {
    supportfolks {
      fullname
      image
    }
    project(id: $id) {
      id
      title
      comments
      lead
      members
      status
      startdate
      keywords
    }
  }
`;

const ProjectForm = ({ id = null }) => {
  const defaultDate = Date.parse(new Date().toString());
  const [values, setValues] = useState({
    title: "",
    comments: "",
    lead: "",
    members: "",
    status: "New",
    startdate: defaultDate,
    keywords: "",
  });
  const [errors, setErrors] = useState([]);
  // const { data, loading } = useQuery(QUERY_SINGLE_PROJECT);
  const { data, loading } = useQuery(QUERY_SINGLE_PROJECT, { variables: { id } });
  const [updateProject] = useMutation(MUTATION_UPDATE_PROJECT);
  const [addProject] = useMutation(MUTATION_ADD_PROJECT);
  useEffect(() => {
    if (data && data.project) {
      setValues({ ...data?.project });
      const members = data?.project?.members;
    }
  }, [data]);

  if (loading && !data) return <div></div>;
  console.log(data, loading);
  // const accounts = data.supportfolks;

  const handleChange = ({ target: { value, name } }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (members) => {
    setValues((prev) => ({ ...prev, members }));
  };

  const handleKeywordsChange = (keywords) => {
    setValues((prev) => ({ ...prev, keywords }));
  };

  const handleSave = async () => {
    if (validate()) {
      if (id) {
        const input = { ...values };
        const where = { id };
        delete input.id;
        delete input.__typename;
        delete input.startdate;
        console.log("save", input);
        try {
          const res = await updateProject({ variables: { where, input } });
          console.log(res);
          if (res.data?.errors) {
          }
        } catch (error) {
          setErrors((prev) => [...prev, JSON.stringify(error)]);
        }
      } else {
        const input = values;
        console.log("add", input);
        try {
          const res = await addProject({ variables: { input } });
          if (res.data?.errors) {
            setErrors((prev) => [...prev, ...res.data.errors]);
          }
        } catch (error) {
          setErrors((prev) => [...prev, JSON.stringify(error)]);
        }
      }
    }
  };

  const validate = () => {
    let retVal = true;
    setErrors([]);
    if (!values.title) {
      setErrors((prev) => [...prev, "Title field seems to be missing"]);
      retVal = false;
    }
    if (!values.comments) {
      setErrors((prev) => [...prev, "Comments seems to be missing, this is required!"]);
      retVal = false;
    }
    if (!values.lead) {
      setErrors((prev) => [...prev, "Project Team Lead seems to be missing, this is required!"]);
      retVal = false;
    }
    return retVal;
  };
  console.log(values.startdate);
  return (
    <div className="bg-gray-100 p-4 h-screen">
      <div>
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-3">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Project Information</h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">Enter information about the project.</p>
              <div className=" mr-4 flex items-center  py-1 px-4 rounded  my-3 text-teal-600">
                <span className="w-4 h-4">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
                <span className="mx-1  text-sm font-semibold">{format(parseInt(values.startdate || defaultDate), "dd MMM")}</span>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="grid grid-cols-6 gap-6">
                  {errors.length > 0 && (
                    <div className="col-span-6 sm:col-span-6">
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm leading-5 font-medium text-red-800">There were {errors.length} errors with your submission</h3>
                            <div className="mt-2 text-sm leading-5 text-red-700">
                              <ul className="list-disc pl-5">
                                {errors.map((err) => (
                                  <li className="mt-1">{err}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      required
                      value={values.title}
                      onChange={handleChange}
                      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6 ">
                    <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      required
                      rows="8"
                      onChange={handleChange}
                      value={values.comments}
                      className="mt-1 resize-none form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                      Project Lead
                    </label>
                    <input
                      id="lead"
                      name="lead"
                      value={values.lead}
                      onChange={handleChange}
                      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <Members value={values.members} onChange={handleMemberChange} />
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-5 text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option>New</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-3 mt-2 pt-3 border-t border-gray-100">
              <Keywords updateKeywords={handleKeywordsChange} id="1" keywords={values.keywords} readOnly={false} />
            </div>
            <div className="flex align-items items-center space-between w-24">
              <TWButton color="teal" onClick={handleSave}>
                {id ? "Update" : "Save"}
              </TWButton>
              <a className="px-4 inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/projects">
                Cancel
              </a>
              <a
                href="/projects"
                class="ml-4 no-underline rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const Members = ({ value, onChange }) => {
  const [members, setMembers] = useState(!value ? [] : value.split(";"));
  const [newMember, setNewMember] = useState("");
  useEffect(() => {
    setMembers(value ? value.split(";") : []);
  }, [value]);
  const handleKeyDown = (e) => {
    e.stopPropagation();
    const member = e.target.value;
    if (e.keyCode === 13) {
      const foundMember = members.find((k) => k === member);
      if (!foundMember) {
        const newMembers = [...members, member];
        setMembers((prev) => newMembers);
        onChange(newMembers.join(";"));
        // SaveKeywords(newKeywords);
      }
      setNewMember("");

      e.preventDefault();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setNewMember(value);
  };
  const handleRemove = (item) => {
    const k = members.filter((k) => k !== item);
    setMembers(k);
    // SaveKeywords(k);
  };

  return (
    <>
      <div className="col-span-6 sm:col-span-6">
        <label htmlFor="country" className="block text-sm font-medium leading-5 text-gray-700">
          Members
        </label>
        <input
          id="members"
          name="members"
          value={newMember}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="type name and press enter to add"
          className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="col-span-6 sm:col-span-6 flex flex-wrap  ">
        {members.map((name) => (
          <span key={name} className="mx-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-pink-100 text-pink-800">
            {name}
            <button
              onClick={() => handleRemove(name)}
              type="button"
              className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default ProjectForm;
