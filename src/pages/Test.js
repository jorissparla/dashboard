import React from 'react';
import EditableMarkDownField from 'common/EditableMarkdownField';
import { useQuery } from 'react-apollo';
import { MAINTENANCE_FAQ_QUERY, MUTATION_UPDATE_MAINTENANCE_FAQ } from 'wizard/Queries';
import { CLOUD_READINESS_QUERY, MUTATION_UPDATE_CLOUD_READINESS } from 'cloudsuite/graphql/Queries';
import useStyles from '../cloudsuite/useCloudFieldStyles';
const Test = ({ user }) => {
  console.log('user', user);
  let canEdit = false;
  if (user && user.permissions) {
    canEdit =
      user.role === 'Admin' ||
      ['CLOUDREADINESS', 'ADMIN'].some(item =>
        user.permissions.find(perm => perm.permission === item)
      );
  }
  const classes = useStyles();
  const { data, loading } = useQuery(CLOUD_READINESS_QUERY);
  if (loading) return <div></div>;
  const { cloudreadiness } = data;

  const { id, maintext, text2, text3, text4 } = cloudreadiness;

  const fields = [
    { name: 'maintext', title: 'Main' },
    { name: 'text2', title: 'Knowledge Base Articles' },
    { name: 'text3', title: 'Training Materials' },
    { name: 'text4', title: 'Other' }
  ];

  return (
    <>
      {fields.map(({ name, title }) => (
        <EditableMarkDownField
          key={name}
          classes={classes}
          name={name}
          label={title}
          value={cloudreadiness[name]}
          id={id}
          canEdit={canEdit}
          updateQuery={MUTATION_UPDATE_CLOUD_READINESS}
        />
      ))}
    </>
  );
};

export default Test;
