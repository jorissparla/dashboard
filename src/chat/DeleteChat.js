import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SharedSnackbarConsumer } from '../globalState/SharedSnackbar.context';

import { ALL_CHATS_QUERY } from '../pages/ChatList';
const DELETE_SINGLE_CHAT_MUTATION = gql`
  mutation DELETE_SINGLE_CHAT_MUTATION($input: ChatInputType) {
    deleteChat(input: $input) {
      result
    }
  }
`;

const DeleteChat = ({ id }) => {
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Mutation
          mutation={DELETE_SINGLE_CHAT_MUTATION}
          variables={{ input: { id } }}
          refetchQueries={[{ query: ALL_CHATS_QUERY }]}
        >
          {(deleteChat, { loading }) => {
            if (loading) {
              return <div />;
            }
            return (
              <ClearIcon
                disabled={loading}
                onClick={async () => {
                  const res = await deleteChat();
                  console.log(res);
                  openSnackbar('Item deleted');
                }}
              />
            );
          }}
        </Mutation>
      )}
    </SharedSnackbarConsumer>
  );
};
export default DeleteChat;
