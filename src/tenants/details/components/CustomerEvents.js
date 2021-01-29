import { useMutation, useQuery, gql } from "@apollo/client";
import Button from "elements/TWButton";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { QUERY_CUSTOMER_EVENTS, MUTATION_ADD_CUSTOMER_EVENT, DELETE_CUSTOMER_EVENT } from "tenants/TenantQueries";
import { useAlert } from "globalState/AlertContext";
import _ from "lodash";

const CustomerEvents = ({ customerid }) => {
  const { data, loading } = useQuery(QUERY_CUSTOMER_EVENTS, { variables: { customerid } });
  const [addCustomerEvent] = useMutation(MUTATION_ADD_CUSTOMER_EVENT, {
    update(cache, { data: { addCustomerEvent } }) {
      cache.modify({
        fields: {
          customerEvents(existingEvents = []) {
            const newEvent = cache.writeFragment({
              data: addCustomerEvent,
              fragment: gql`
                fragment NewEvent on CustomerEvent {
                  id
                  date
                  comment
                  eventtype
                  nrusers
                }
              `,
            });
            return _.orderBy([...existingEvents, newEvent], ["date"], ["desc"]);
          },
        },
      });
    },
  });
  const [deleteCustomerEvent] = useMutation(DELETE_CUSTOMER_EVENT);
  const [events, setEvents] = useState([]);
  const today = format(Date.now(), "yyyy-MM-dd");
  let initialState = { date: today, nrusers: 10, eventtype: "Go Live", comment: "", customerid };
  const alert = useAlert();
  const [values, setValues] = useState(initialState);
  useEffect(() => {
    console.log("data changed");
    if (data) {
      setEvents(_.orderBy(data.customerEvents, ["date"], ["desc"]));
      // setEvents(data.customerEvents);
    }
  }, [data]);

  if (loading) return null;
  // const { customerEvents } = data;

  function handleChangeValues(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  async function saveEvent(e) {
    e.preventDefault();
    alert.setMessage("Event added");

    const input = { ...values, nrusers: parseInt(values.nrusers), date: new Date(values.date).toISOString() };
    const result = await addCustomerEvent({ variables: { input } });
    console.log(result);
    setValues(initialState);
  }
  async function handleDelete(id) {
    const where = { id };
    const result = await deleteCustomerEvent({
      variables: { where },
      optimisticResponse: true,
      update: (cache) => {
        const existingEvents = cache.readQuery({ query: QUERY_CUSTOMER_EVENTS, variables: { customerid } });
        try {
          const newEvents = existingEvents.customerEvents.filter((t) => t.id !== id);
          cache.writeQuery({
            query: QUERY_CUSTOMER_EVENTS,
            variables: { customerid },
            data: { customerEvents: newEvents },
          });
        } catch (e) {
          console.log(e);
        }
      },
    });

    alert.setMessage("Event deleted");
    console.log(result);
  }
  return (
    <div>
      <div className="mt-5 py-4"></div>
      <div>
        <div className="shadow overflow-hidden sm:rounded-md">
          <Button onClick={saveEvent} color="teal" variant="contained">
            Add Event
          </Button>
          <div className="px-4 py-1 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6 ">
              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input type="date" name="date" id="date" className="div-input" value={values.date} onChange={handleChangeValues} />
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="nrusers" className="block text-sm font-medium text-gray-700">
                  Nr Users
                </label>
                <input
                  type="text"
                  name="nrusers"
                  id="nrusers"
                  autocomplete="given-name"
                  className="form-input"
                  value={values.nrusers}
                  onChange={handleChangeValues}
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="eventtype" className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select id="eventtype" name="eventtype" value={values.eventtype} className="form-input" onChange={handleChangeValues}>
                  <option>Go Live</option>
                  <option>Migration</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-span-6 ">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  rows={2}
                  type="text"
                  name="comment"
                  id="comment"
                  className="form-textarea resize-none"
                  value={values.comment}
                  onChange={handleChangeValues}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 border-b border-t bg-gray-600 text-white border-gray-200 font-sans text-sm flex justify-between items-center">
        <div className="font-bold px-2 flex justify-center center">Date</div>
        <div className="font-bold px-2">Comments</div>
        <div className="font-bold px-2">Delete</div>
      </div>
      {events.map((ev) => (
        <div className="py-1 border-b border-gray-200 font-sans text-sm flex justify-between items-center  ">
          <div className="-my-4 px-2 w-32  border-gray-200">{format(parseInt(ev.date), "dd-MMM-yyyy")}</div>
          {ev.eventtype === "Migration/Data Load" && <span className="rounded-full p-1 bg-red-500 font-semibold text-white">Migration</span>}
          {ev.eventtype === "Go Live" && <span className="rounded-full p-1 bg-red-500 font-semibold text-white">Go live</span>}
          <div className="font-sans">{ev.comment}</div>
          <button className="flex items-center" onClick={() => handleDelete(ev.id)}>
            <svg
              className="w-5 h-5 hover:text-blue-600 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomerEvents;
