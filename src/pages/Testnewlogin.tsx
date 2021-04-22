import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY } from "graphql/CURRENT_USER_QUERY";
import { CustomTable } from "elements/CustomTable";
import { GenericTable } from "elements/GenericTable";
import SearchBar from "common/SearchBar";
import TWButton from "elements/TWButton";
import { format } from "date-fns";
import { useAlert } from "globalState/AlertContext";

const OLOGIN_MUTATION = gql`
  mutation m {
    loginUser(input: { email: "joris.sparla@marcam.com", password: "Infor2020" }) {
      token
      user {
        id
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation m {
    signinUser(input: { email: "joris.sparla@marcam.com", password: "Infor2020" }) {
      token
      user {
        id
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation x {
    signout {
      message
    }
  }
`;

const CURRENT = gql`
  query curr {
    currentUser {
      email
      lastlogin
    }
  }
`;

const SESSIONS_QUERY = gql`
  query s {
    activesessions {
      ip
      email
      sessionToken
      updatedAt
      createdAt
    }
  }
`;
const KILLSESSIONS = gql`
  mutation KILLSESSIONS {
    killsessions
  }
`;
const KILLSESSION = gql`
  mutation KILLSESSION($sessionToken: String) {
    killSomeSessions(sessionToken: $sessionToken)
  }
`;

const formatDate = (val: any) => format(parseInt(val), "yyyy-MM-dd HH:mm");
const Testnewlogin = () => {
  const [sessions, setSessions] = useState([]);
  const [searchText, setSearchText] = useState<String>("");
  const [isUnlocked, setUnlocked] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [ologin] = useMutation(OLOGIN_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const [killsessions] = useMutation(KILLSESSIONS);
  const [killsession] = useMutation(KILLSESSION);
  const current = useQuery(CURRENT);
  const { data: data2 } = useQuery(CURRENT_USER_QUERY);
  const sessionData = useQuery(SESSIONS_QUERY);
  // console.log("render", data.sessions);
  const newme = current.data;
  const alert = useAlert();
  useEffect(() => {
    const activesessions = sessionData?.data?.activesessions || [];
    if (searchText) {
      setSessions(activesessions.filter((sess: any) => sess.email.toUpperCase().includes(searchText.toUpperCase())));
    } else {
      setSessions(activesessions);
    }
  }, [sessionData, searchText, sessionCount]);
  async function killSession(sessionToken: string) {
    const result = await killsession({ variables: { sessionToken }, refetchQueries: [{ query: SESSIONS_QUERY }] });
    setSessionCount(1 - sessionCount);
    alert.setMessage(`${result.data.killSomeSessions}`);
  }
  return (
    <div className="flex flex-col bg-gray-50  h-screen w-full">
      <div className="flex">
        {/* <TWButton
          color="teal"
          onClick={async () => {
            const result = await ologin({ refetchQueries: [{ query: CURRENT_USER_QUERY }] });
            console.log(`result`, result);
          }}
        >
          Old Login
        </TWButton> */}
        {/* <TWButton
          onClick={async () => {
            const result = await login({ refetchQueries: [{ query: CURRENT }, { query: SESSIONS_QUERY }] });
            console.log(`result`, result);
          }}
        >
          Login
        </TWButton>
        <TWButton
          onClick={async () => {
            const result = await logout();
            console.log(`result`, result);
          }}
        >
          LogOut
        </TWButton>*/}
        <TWButton
          color="pink"
          onClick={async () => {
            const result = await killsessions({ refetchQueries: [{ query: SESSIONS_QUERY }] });
            console.log(`result`, result);
          }}
        >
          Kill Sessions
        </TWButton>
      </div>
      {/* <div className="flex">{JSON.stringify(newme, null, 2)}</div> */}
      <SearchBar hintText="type email of session" onChange={(value: string) => setSearchText(value)} />
      <div className="text-2xl font-bold text-gray-700 m-2">Sessions</div>
      <div className="theme-neon  flex">
        <button className="w-32 bg-gradient-to-br from-skin-hue via-skin-hue to-transparent">Test</button>
      </div>
      <div className="m-2 rounded-sm shadow-lg p-2 bg-white">
        <CustomTable
          data={sessions}
          fields={[
            {
              title: "IP",
              fld: "ip",
              className:
                "bg-teal-300 text-teal-700 mx-2 rounded px-4  py-2  font-semibold font-sans leading-tight shadow-md pointer hover:bg-teal-200 w-32",
              action: console.table,
            },
            {
              title: "Email",
              fld: "email",
              className: "text-gray-700",
            },
            {
              title: "Created",
              fld: "createdAt",
              fn: formatDate,
              className: "text-teal-700 font-sans font-semibold text-xs",
            },
            {
              title: "Token",
              fld: "sessionToken",
              className: "cursor-pointer  bg-amber-100 border-amber-300  rounded-xl border-4",
              action: (value: any) => killSession(value),
            },
          ]}
          indexField={{ title: "sessionToken", fld: "sessionToken" }}
        />
      </div>
      {/* <div className="flex">{JSON.stringify(activesessions, null, 2)}</div> */}
    </div>
  );
};

export default Testnewlogin;
