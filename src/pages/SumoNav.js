import React from "react";

export function Nav({ children }) {
  return (
    <nav className="p-4">
      <ul className="flex space-x-2 list-none">{children}</ul>
    </nav>
  );
}

export function NavItem({ href, isActive, children }) {
  return (
    <li className="no-underline">
      <a href={href} className={`block px-4 py-2 rounded-md no-underline ${isActive ? "bg-amber-100 text-amber-700" : ""}`}>
        {children}
      </a>
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
