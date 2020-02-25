import { Backdrop, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import CopyToClipBoard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import { useLocalStorage } from './../utils/useLocalStorage';
import AddSymptomRequestForm from './AddSymptomRequestForm';
import EditSymptomRequestForm from './EditSymptomRequestForm';
import { ALL_SYMPTOMS } from './Queries';
// import SymptomsRequestTable from './SymptomsRequestsTable';
import SymptomsRequestTable from './SymptomsTableNew';

const ListItem = styled.li`
  list-style-type: circle;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  width: 50vw;
`;

const List = styled.ul`
  padding: 8px 7px;
  margin: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;
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

const Sym = styled.span`
  :hover {
    border: 2px solid purple;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
`;

function containsValues(item, value) {
  return item.toUpperCase().includes(value.toUpperCase());
}

const SymptomsPage = () => {
  const { data, loading } = useQuery(ALL_SYMPTOMS);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [foundNr, setFoundNr] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [maxNr, setMaxNr] = useLocalStorage('maxnrsymptoms', 10);
  const [isOpen, setisOpened] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [defaultValues, setDefaultValues] = useState(null);

  if (loading) return <Spinner />;

  return <SymptomsRequestTable data={data} />;
};

export default SymptomsPage;
