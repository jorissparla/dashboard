import Snackbar from '@material-ui/core/Snackbar';
import gql from 'graphql-tag';
import React, { Fragment, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { withRouter } from 'react-router';
import { Card } from '../common';
import { SharedSnackbarConsumer } from '../globalState/SharedSnackbar.context';
//import format from 'date-fns/format';
import { format } from '../utils/format';
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

const YMDFORMAT = 'yyyy-MM-dd';

const ChatContainer = props => {
  const { data, loading } = useQuery(ALL_CHATS);
  const [addChat] = useMutation(ADD_CHAT);

  const [state] = useState({
    showDialog: false,
    body: '',
    values: {},
    message: 'added',
    showMessage: false,
    err: ''
  });
  if (loading) return <div>Loading</div>;

  const { ranges } = data;
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

    // const percentage = (100 * responseintime) / nrchats;
    const input = {
      weeknr,
      team,
      nrchats: parseInt(nrchats),
      responseintime: parseInt(responseintime),
      fromDate: format(parseInt(fromDate), YMDFORMAT)
    };
    await addChat({
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
