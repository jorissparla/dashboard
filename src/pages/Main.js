import React from "react";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

const Main = () => {
  return (
    <div className="ml-12 grid grid-cols-4 grid-rows-5 col-gap-3 row-gap-1 h-screen mt-5 ">
      <NavItem color="text-teal-400">
        <BusinessCenterIcon />
      </NavItem>
      <NavItem color="text-pink-400" />
      <NavItem color="text-red-400" />
      <NavItem color="text-yellow-400" />
      <NavItem color="text-purple-400" />
      <NavItem color="text-green-400" />
      <NavItem color="text-gray-400" />
      <NavItem />
      <NavItem />
      <NavItem />
      <NavItem />
      <NavItem />
      <NavItem />
    </div>
  );
};

export default Main;

const NavItem = ({ color = "text-blue-600", Icon = () => <BusinessCenterIcon />, children }) => (
  <div className="flex col-span-1 m-4 border border-gray-50 border-dotted">
    <div className={`flex ${color}`} style={{ fontSize: 72 }}>
      {children}
    </div>
    <div className="flex flex-col">
      <div className="text-blue-200">My Reviews</div>
      <div className="text-sm font-sans text-gray-600">See a list of open issues</div>
    </div>
  </div>
);
