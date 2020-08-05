import Snackbar from "@material-ui/core/Snackbar";
import gql from "graphql-tag";
import React, { Fragment, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { withRouter } from "react-router";
import { Card } from "../common";
import { SharedSnackbarConsumer } from "../globalState/SharedSnackbar.context";
//import format from 'date-fns/format';
import { format } from "../utils/format";
import ChatAdd from "./ChatAdd";
import { useAlert } from "globalState/AlertContext";

window.format = format;

const ADD_CHAT = gql`
  mutation createChat($input: ChatInputType) {
    createChat(input: $input) {
      id
      weeknr
      team
      percentage
      responseintime
      nrchats
    }
  }
`;

const ALL_CHATS = gql`
  query ALL_CHATS {
    chats {
      id
      weeknr
      team
      percentage
      responseintime
      nrchats
    }
    ranges {
      ID
      FromDate
      ToDate
      Name
      RangeType
      FullRange
    }
  }
`;

const YMDFORMAT = "yyyy-MM-dd";

const ChatContainer = (props) => {
  const { data, loading } = useQuery(ALL_CHATS);
  const [addChat] = useMutation(ADD_CHAT);
  const alert = useAlert();
  const [state] = useState({
    showDialog: false,
    body: "",
    values: {},
    message: "added",
    showMessage: false,
    err: "",
  });
  if (loading) return <div>Loading</div>;

  const { ranges } = data;
  const doCancel = () => {
    props.history.push("/chat");
  };

  const findWeekfromDate = (weeknr, ranges) => {
    const obj = ranges.find((o) => o.Name === weeknr);
    return obj.FromDate;
  };

  const handleSubmitAdd = async (values) => {
    const { weeknr, team, nrchats, responseintime } = values;
    const fromDate = findWeekfromDate(weeknr, ranges);

    // const percentage = (100 * responseintime) / nrchats;
    const input = {
      weeknr,
      team,
      nrchats: parseInt(nrchats),
      responseintime: parseInt(responseintime),
      fromDate: format(parseInt(fromDate), YMDFORMAT),
    };
    await addChat({
      variables: {
        input,
      },
    });
  };

  return (
    <Fragment>
      <div className="h-screen w-full bg-gray-100 px-2">
        <ChatAdd
          ranges={ranges}
          onSave={(values) => {
            handleSubmitAdd(values);
            alert.setMessage(`Data for ${values.team}, week ${values.weeknr} updated `);
          }}
          onCancel={doCancel}
          entry={null}
        />
      </div>
    </Fragment>
  );
};

export default withRouter(ChatContainer);
