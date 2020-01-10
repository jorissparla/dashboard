import Snackbar from '@material-ui/core/Snackbar';
import gql from 'graphql-tag';
import React, { Fragment, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { withRouter } from 'react-router';
import { Card } from '../common';
import { SharedSnackbarConsumer } from '../globalState/SharedSnackbar.context';
//import format from 'date-fns/format';
import { format } from '../utils/format';
import { CREATE_CHAT } from './../actions/index';
import ChatAdd from './ChatAdd';

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

const DELETE_CHAT = gql`
  mutation deleteChat($input: ChatInputType) {
    deleteChat(input: $input) {
      result
    }
  }
`;
const ALL_RANGES = gql`
  query ALL_RANGES {
    allRanges: ranges {
      ID
      FromDate
      ToDate
      Name
      RangeType
      FullRange
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

// const addChat = ({ render }) => (
//   <Mutation
//     mutation={ADD_CHAT}
//     refetchQueries={[{ query: ALL_CHATS }]}
//     update={(cache, { data: { createChat } }) => {
//       const query = ALL_CHATS;
//       const props = cache.readQuery({ query });
//       const { chats } = props;
//       cache.writeQuery({
//         query,
//         data: { chats: R.concat(chats, [createChat]) }
//       });
//     }}
//   >
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// );

// const deleteChat = ({ render }) => (
//   <Mutation mutation={DELETE_CHAT} refetchQueries={[{ query: ALL_CHATS }]}>
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// );

// const myRanges = ({ render }) => (
//   <Query query={ALL_RANGES}>{(data, loading) => render(data, loading)}</Query>
// );

// const myChats = ({ render }) => <Query query={ALL_CHATS}>{data => render(data)}</Query>;

// const mapper = {
//   myRanges,
//   myChats,
//   //chats: <Query query={ALL_CHATS} />,
//   addChat,
//   deleteChat
// };

// const mapProps = ({ myRanges, myChats, addChat }) => ({
//   ranges: myRanges.data.allRanges,
//   chats: myChats.data.chats,
//   loading: myChats.loading,
//   loading1: myRanges.loading,
//   addChat: addChat.mutation,
//   addChatResult: addChat.result,
//   deleteChat: deleteChat.mutation,
//   deleteChatResult: deleteChat.result
// });

// const MyContainer = adopt(mapper, mapProps);

const ChatContainer = props => {
  const { data, loading } = useQuery(ALL_CHATS);
  const [addChat] = useMutation(ADD_CHAT);

  const [state, setState] = useState({
    showDialog: false,
    body: '',
    values: {},
    showMessage: false,
    err: ''
  });
  if (loading) return <div>Loading</div>;

  const { ranges, chats } = data;
  const doCancel = () => {
    props.history.push('/chat');
  };

  const findWeekfromDate = (weeknr, ranges) => {
    const obj = ranges.find(o => o.Name === weeknr);
    return obj.FromDate;
  };

  const handleSubmitAdd = async values => {
    const { weeknr, team, nrchats, responseintime } = values;
    const fromDate = findWeekfromDate(weeknr, ranges);

    const percentage = (100 * responseintime) / nrchats;
    const input = {
      weeknr,
      team,
      nrchats: parseInt(nrchats),
      responseintime: parseInt(responseintime),
      fromDate: format(parseInt(fromDate), 'yyyy-MM-dd')
    };
    const result = await addChat({
      variables: {
        input
      }
    });
  };

  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => {
        return (
          <Fragment>
            <Card>
              <ChatAdd
                ranges={ranges}
                onSave={values => {
                  handleSubmitAdd(values);
                  openSnackbar('Entry Added');
                }}
                onCancel={doCancel}
                entry={null}
              />
              <Snackbar
                open={state.showMessage}
                message={state.err}
                autoHideDuration={4000}
                onRequestClose={() => console.log('close')}
              />
            </Card>
          </Fragment>
        );
      }}
    </SharedSnackbarConsumer>
  );
};

export default withRouter(ChatContainer);
