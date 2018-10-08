import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Routes from "../routes";
//import AppRoutes from '../routes'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

test("<Counter />", () => {
  // Renders component
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
  );

  debug(); // Outputs dom as string
  //console.log(getByTestId("counter-text").textContent);
  // Asserts text value 0 is found within a button
  // expect(wrapper.getByText('0').tagName).toBe('BUTTON');
});
