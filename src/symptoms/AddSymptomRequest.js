import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { ALL_SYMPTOM_CATEGORIES, ADD_SYMPTOM_REQUEST_MUTATION, ALL_SYMPTOMS } from './Queries';
import { useHistory } from 'react-router';

const AddSymptomRequest = () => {
  const { data, loading } = useQuery(ALL_SYMPTOM_CATEGORIES);
  const [state, setState] = useState({ symptom: '', symptom_category: '', incident: '' });
  const [addSymptomRequest] = useMutation(ADD_SYMPTOM_REQUEST_MUTATION);
  const history = useHistory();
  useEffect(() => {
    if (data && data.symptom_categories) {
      setState({ ...state, symptom_category: data.symptom_categories[0].symptom_category });
    }
  }, [loading]);
  if (loading) return <div></div>;

  const categories = data.symptom_categories;

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log('Submitted values', values);
    const result = await addSymptomRequest({
      variables: { input: state },
      refetchQueries: [{ query: ALL_SYMPTOMS }]
    });
    history.push('/symptoms');
  };
  const handleChange = event => {
    event.persist();
    console.log(event.target.name, event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div className="bg-gray-200 fixed inset-0 h-full w-full mt-16 flex ">
      <div className="  flex flex-col  justify-between w-full">
        <form className="rounded shadow m-4 bg-white p-4" onSubmit={handleSubmit}>
          <div style={{ fontFamily: 'Poppins' }} className="font-pop text-4xl">
            Request new Symptom
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Symptom
            </label>
            <input
              className="w-32 appearance-none border rounded shadow-xs py-2 px-3 text-gray-700 w-full mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="area"
              value={state.symptom}
              name="symptom"
              onChange={handleChange}
              placeholder="Enter new Symptom "
              id="symptom"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Category
            </label>
            <div class="relative rounded ml-2 mr-4 appearance-none border rounded shadow-xs py-2 px-3 text-gray-700 ">
              <select
                class=""
                value={state.symptom_category}
                name="symptom_category"
                onChange={handleChange}
              >
                {categories.map(({ id, symptom_category }) => (
                  <option key={id}>{symptom_category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="incident">
              Incident
            </label>
            <input
              className="shadow-xs appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="incident"
              type="text"
              value={state.incident}
              name="incident"
              onChange={handleChange}
              placeholder="Incident Number"
            />
          </div>
          {/* <div>{JSON.stringify(state)}</div> */}
          <div className="mt-4 flex justify-between items-center">
            <button
              className=" bg-blue-500 text-white  py-2 px-6 shadow-md rounded-lg"
              type="submit"
            >
              Save
            </button>
            <button
              className="ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-2 md:py-4 xl:py-3 bg-gray-300 hover:bg-gray-200 md:text-md xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
              onClick={() => history.push('/symptoms')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddSymptomRequest;
