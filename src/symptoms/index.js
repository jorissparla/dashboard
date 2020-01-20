import { Backdrop, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import CopyToClipBoard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import Spinner from 'utils/spinner';
import { useLocalStorage } from './../utils/useLocalStorage';
import AddSymptomRequestForm from './AddSymptomRequestForm';
import { ALL_SYMPTOMS } from './Queries';
import './symptoms.css';
import SymptomsRequestTable from './SymptomsRequestsTable';

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
  const [searchText, setSearchText] = useState('');
  const [maxNr, setMaxNr] = useLocalStorage('maxnrsymptoms', 10);
  const [isOpen, setisOpened] = useState(false);

  useEffect(() => {
    if (data) setAllSymptoms(data.symptoms);
  }, [loading, data]);
  if (loading) return <Spinner />;
  const symptoms = allSymptoms
    .filter(({ symptom }) => containsValues(symptom, searchText))
    .slice(0, maxNr || 10);
  return (
    <div className="parent">
      <div className="div4">
        <Input
          name="search"
          onChange={e => setSearchText(e.target.value)}
          placeholder="Start typing to match symptom"
          width={300}
        />
      </div>
      <div className="div5">
        Show first
        <Input
          name="maxnr"
          value={maxNr}
          onChange={e => setMaxNr(e.target.value || 10)}
          width={50}
        />
      </div>
      <div className="div3">
        <h3>
          showing {symptoms.length} of {allSymptoms.length} symptoms
        </h3>
        <List>
          {symptoms.map(s => (
            <ListItem key={s.symptom}>
              <CopyToClipBoard onCopy={() => console.log('copied')} text={s.symptom}>
                <Sym title="Click to copy to clipboard">
                  {s.symptom}({s.symptom_category})
                </Sym>
              </CopyToClipBoard>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="div1">
        <h3>Pending Requests</h3>
        <Button variant="outlined" color="primary" onClick={() => setisOpened(true)}>
          Add
        </Button>
        <SymptomsRequestTable data={data.symptomrequests} />

        <Modal
          onClose={() => setisOpened(false)}
          open={isOpen}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <AddSymptomRequestForm
            onClose={() => setisOpened(false)}
            categories={data.symptom_categories}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SymptomsPage;