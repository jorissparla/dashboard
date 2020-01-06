import * as React from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { usePersistentState } from '../hooks';

interface Props {
  children: any;
}

let initialContext: any;
initialContext = null;

export const SelectionContext = React.createContext(initialContext);

export const SelectionProvider: React.FC<Props> = ({ children }) => {
  const [owner, setOwner] = React.useState('');
  const [products, setProducts] = usePersistentState('selectedproducts', ['LN']);
  const [isCloud, setisCloud] = React.useState(false);
  const [persons, setPersons] = useLocalStorage('persons', []);

  const [actionNeeded, setActionNeeded] = React.useState(true);
  return (
    <SelectionContext.Provider
      value={{
        owner,
        setOwner,
        isCloud,
        setisCloud,
        actionNeeded,
        setActionNeeded,
        products,
        setProducts,
        persons,
        setPersons
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
