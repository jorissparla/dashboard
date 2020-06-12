import React from "react";

interface NavLinkProps {
  title: string;
  Icon: any;
  navigateTo: string;
  history: any;
  toggleMenu: () => null;
  open?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ title, Icon, navigateTo, history, toggleMenu, open = true }) => (
  <a
    href={navigateTo}
    className="flex items-center py-2 text-gray-600 ml-2 cursor-pointer no-underline"
    // onClick={() => {
    //   // toggleMenu();
    //   setTimeout(() => {
    //     toggleMenu();
    //     history.push(navigateTo);
    //   }, 500);
    //   return null;
    // }}
  >
    {Icon && (
      <span className="px-2">
        <Icon />
      </span>
    )}
    {open && <span>{title}</span>}
  </a>
);
