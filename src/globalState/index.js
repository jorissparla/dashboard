import React from 'react';
import DashBoardProvider from './Provider';
import { SelectionProvider } from './SelectionContext';
function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  );
}

export default function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<DashBoardProvider />, <SelectionProvider />]}>
      {children}
    </ProviderComposer>
  );
}
