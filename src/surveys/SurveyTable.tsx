import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
// import Rating from 'material-ui-rating';
import { initials } from '../utils/misc';
import { format } from './../utils/format';

interface Props {
  surveys: any[];
}

const imgStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: '#1da1f2',
  color: 'white'
};

const TableCell1 = ({ children }: any) => (
  <TableCell style={{ fontSize: '1.2rem', color: '#111111', fontFamily: 'Poppins' }}>
    {children}
  </TableCell>
);

export const SurveyTable: React.FC<Props> = ({ surveys }) => {
  console.log('surveys', surveys);
  return (
    <Table style={{ background: 'white' }}>
      <TableHead>
        <TableRow>
          {/* style={{ backgroundColor: '#524763', color: 'white' }}> */}
          <TableCell1>Img</TableCell1>
          <TableCell1>Analyst</TableCell1>
          <TableCell1>Incident</TableCell1>
          <TableCell1>Customer</TableCell1>
          <TableCell1>Comment?</TableCell1>
          {/* <TableCell1>Rating</TableCell1> */}
          <TableCell1>Date Submitted</TableCell1>
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
            {/* <TableCell style={{ width: 200, display: 'flex' }}>
              <Rating value={survey.rating ? survey.rating : 5} max={5} readOnly={true} />
              {/* {survey.rating ? survey.rating : 5} */}
            {/* </TableCell> */}
            <TableCell>{format(survey.date_submitted, 'EEEE, dd MMMM yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
