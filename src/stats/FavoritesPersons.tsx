import * as React from 'react';
import styled from 'styled-components';
import StudentChip, { RegularChip } from '../courses/StudentChip';
import { useLocalStorage } from '../utils/useLocalStorage';
import { SelectionContext } from '../globalState/SelectionContext';
import { Block } from '../elements/Block';
import useTimeout from '../hooks/useSetTimeout';

interface Props {
  persons: string[];
}

export const FavoritePersons: React.FC<Props> = ({ persons }) => {
  // const initialValue: string[] = [];
  // const [arrayOfPersons, setArrayOfPersons] = React.useState(initialValue);

  const { setOwner, setPersons } = React.useContext(SelectionContext);
  const [started, setStarted] = React.useState(false);
  const [currp, setCurrp] = React.useState('');
  React.useEffect(() => {}, []);

  function handleDelete(name: string) {
    const newPersons = persons.filter((p: any) => p.name !== name);
    // setArrayOfPersons(newPersons);
    setPersons(newPersons);
  }

  React.useEffect(() => {
    setTimeout(() => (started ? handleDelete(currp) : console.log('stopped')), 2500);
  }, [started]);
  function handleClick(name: string) {
    setOwner(name);
    console.log('handleClick');
  }
  return (
    <div>
      {persons.map((person: any) => (
        <Block
          key={person.name}
          onClick={() => handleClick(person.name)}
          selected={true}
          onMouseDown={e => {
            if (e.nativeEvent.which === 3) {
              setCurrp(person.name);
              setStarted(true);
            }
          }}
          onMouseUp={e => {
            setStarted(false);
          }}
        >
          {person.name}
        </Block>

        // <RegularChip
        //   name={person.name}
        //   handleClick={() => handleClick(person.name)}
        //   handleDelete={() => handleDelete(person.name)}
        // />
      ))}
    </div>
  );
};

export const ListFavoritePersons: React.FC<Props> = ({ persons }) => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 2
      }}
    >
      <FavoritePersons persons={persons} />
    </div>
  );
};
