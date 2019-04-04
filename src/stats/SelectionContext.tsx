import * as React from 'react';

interface Props {
  children: any;
}

let initialContext: any;
initialContext: null;

export const SelectionContext = React.createContext(initialContext);

export const SelectionProvider: React.FC<Props> = ({ children }) => {
  const [owner, setOwner] = React.useState('');

  const [isCloud, setisCloud] = React.useState(false);

  const [actionNeeded, setActionNeeded] = React.useState(true);
  return (
    <SelectionContext.Provider
      value={{
        owner,
        setOwner,
        isCloud,
        setisCloud,
        actionNeeded,
        setActionNeeded
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
