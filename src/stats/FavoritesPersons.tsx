import * as React from 'react';
import styled from 'styled-components';
import StudentChip, { RegularChip } from '../courses/StudentChip';
import { useLocalStorage } from '../utils/useLocalStorage';
import { SelectionContext } from '../globalState/SelectionContext';

interface Props {}

export const doAddPersonToLocalStorage = (newPerson: string) => {
  const item = window.localStorage.getItem('persons');
  let persons: any = [];
  if (!item || item.length === 0) {
    persons = [];
  } else {
    persons = JSON.parse(item);
    console.log('do', item, persons, typeof persons);
  }
  persons = persons.filter((person: any) => newPerson !== person.name).concat({ name: newPerson });

  window.localStorage.setItem('persons', JSON.stringify(persons));
  return persons;
};

export const FavoritePersons: React.FC<Props> = ({}) => {
  const [arrayOfPersons, setArrayOfPersons] = React.useState([]);

  const { setOwner } = React.useContext(SelectionContext);
  const [persons, setPersons] = useLocalStorage('persons', []);

  React.useEffect(() => {
    console.log(persons);
    if (persons.length === 0) {
      setArrayOfPersons([]);
    } else setArrayOfPersons(JSON.parse(persons));
  }, []);

  function handleDelete(name: string) {
    const newPersons = arrayOfPersons.filter((p: any) => p.name !== name);
    setArrayOfPersons(newPersons);
    setPersons(newPersons);
  }

  return (
    <div>
      {arrayOfPersons.map((person: any) => (
        <RegularChip
          name={person.name}
          handleClick={() => setOwner(person.name)}
          handleDelete={() => handleDelete(person.name)}
        />
      ))}
    </div>
  );
};

export const ListFavoritePersons = () => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 2
      }}
    >
      <FavoritePersons />
    </div>
  );
};
