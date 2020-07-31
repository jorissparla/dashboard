import React from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import { ALL_SYMPTOMS } from './Queries';
// import SymptomsRequestTable from './SymptomsRequestsTable';
import SymptomsRequestTable from './SymptomsTableNew';

export const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 8px;
  width: ${props => (props.width ? `${props.width}px` : '200px')};
  min-height: 28px;
  font-size: 1em;
  line-height: 1.5;
  font-family: 'Segoe UI', Roboto;
  color: ${props => (props.color ? props.color : 'rgba(0, 0, 0, 0.65)')};
  background-color: ${props => (props.background ? props.background : '#fff')};
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  resize: none;
`;

const SymptomsPage = () => {
  const { data, loading } = useQuery(ALL_SYMPTOMS);

  if (loading) return <Spinner />;

  return <SymptomsRequestTable data={data} />;
};

export default SymptomsPage;
