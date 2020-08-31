import React from "react";

interface NavLinkProps {
  title: string;
  color?: string;
  Icon: any;
  navigateTo: string;
  history: any;
  toggleMenu: () => null;
  open?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ title, color = "text-gray-600", Icon, navigateTo, history, toggleMenu, open = true }) => (
  <a
    href={navigateTo}
    className={`font-sans font-semibold text-sm flex items-center py-2 ml-2 cursor-pointer no-underline ${color}`}
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
