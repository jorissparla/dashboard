import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import TWButton from "elements/TWButton";

const MAILER_LOG_DETAIL = gql`
  query MAILER_LOG_DETAIL($id: ID) {
    mailerlog(id: $id) {
      id
      date
      dest
      subject
      message
    }
  }
`;

const MailerLogDetail = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(MAILER_LOG_DETAIL, { variables: { id } });
  if (loading) {
    return <Spinner />;
  }

  const { mailerlog } = data;

  return (
    <div className="h-screen w-full bg-gray-50 mt-8">
      <div className="m-8 bg-white rounded-xl shadow-lg p-3 grid grid-cols-10 ">
        <div className="text-gray-700 font-sans  mr-2 font-semibold col-span-10 gap-1 mb-4">
          <span className="font-semibold col-span-2 mx-2">Subject</span>
          <span className="border-grey-400 border rounded px-2 py-1 col-span-8">{mailerlog.subject}</span>
        </div>
        <div className="text-gray-700 font-sans  mr-2 font-semibold col-span-10 gap-1 mb-4">
          <span className="font-semibold col-span-2 mx-2">Send to</span>
          <span className="border-grey-400 border rounded px-2 py-1 col-span-8">{mailerlog.dest}</span>
        </div>
        <div className="text-gray-700 font-sans  mr-2 font-semibold col-span-10 gap-1 mb-4">
          <span className="font-semibold col-span-2 mx-2">Message</span>
          <div className="font-sans text-sm bg-gray-100 rounded m-4 p-4 col-span-10" dangerouslySetInnerHTML={{ __html: mailerlog.message }}></div>
        </div>
        <a
          className="mx-2 rounded px-4  py-3  font-bold   leading-tight shadow-md bg-gray-700 text-white hover:bg-gray-400 no-underline"
          href="/mailerlogs"
        >
          Back To Logs
        </a>
      </div>
    </div>
  );
};

export default MailerLogDetail;
