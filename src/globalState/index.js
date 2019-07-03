import React from 'react';
import DashBoardProvider from './Provider';
import { SelectionProvider } from './SelectionContext';
import { SharedSnackbarProvider } from './SharedSnackbar.context';
import { FilterFieldProvider } from './FilterContext';
import { ThemeContextProvider } from './ThemeContext';
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
    <ProviderComposer
      contexts={[
        <DashBoardProvider />,
        <SelectionProvider />,
        <SharedSnackbarProvider />,
        <FilterFieldProvider />,
        <ThemeContextProvider />
      ]}
    >
      {children}
    </ProviderComposer>
  );
}
