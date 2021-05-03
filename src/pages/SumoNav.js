import React from "react";
import { useHistory } from "react-router";

export function Nav({ children }) {
  return (
    <nav className="p-4">
      <ul className="flex space-x-2 list-none">{children}</ul>
    </nav>
  );
}

export function NavItem({ href, isActive, children }) {
  const history = useHistory();
  return (
    <li className="no-underline">
      <button
        onClick={() => history.push(href)}
        className={`font-sans block px-4 py-2 rounded-md no-underline ${isActive ? "bg-amber-100 text-amber-700" : ""}`}
      >
        {children}
      </button>
    </li>
  );
}
export function SumoNav({ current }) {
  return (
    <Nav>
      <NavItem href="/sumo" isActive={current === "Sumo Logs"}>
        Sumo Logs
      </NavItem>
      <NavItem href="/sumoalerts" isActive={current === "Alerts"}>
        Alerts
      </NavItem>
      <NavItem href="/sumoincidents" isActive={current === "Incidents"}>
        Incidents
      </NavItem>
    </Nav>
  );
}
