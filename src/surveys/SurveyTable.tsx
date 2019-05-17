import * as React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { initials } from '../utils/misc';
import { format } from './../utils/format';

interface Props {
  surveys: any[];
}

const imgStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'orange',
  color: 'white'
};

export const SurveyTable: React.FC<Props> = ({ surveys }) => {
  console.log('surveys', surveys);
  return (
    <Table style={{ background: 'white' }}>
      <TableHead>
        <TableRow>
          <TableCell>Img</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Incident</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Comment?</TableCell>
          <TableCell>Date Submitted</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {surveys.map((survey, index) => (
          <TableRow key={index}>
            <TableCell>
              {survey.account && survey.account.image ? (
                <Avatar src={survey.account.image} style={imgStyle} />
              ) : (
                <Avatar style={imgStyle}>{initials(survey.owner)}</Avatar>
              )}
            </TableCell>
            <TableCell>{survey.owner}</TableCell>
            <TableCell>{survey.case_id}</TableCell>
            <TableCell>{survey.company_name}</TableCell>
            <TableCell>{survey.contact_comments}</TableCell>
            <TableCell>{format(survey.date_submitted, 'dddd, DD MMMM YYYY')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
