import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ to, children, activeStyle }) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? activeStyle : undefined)}>
      {children}
    </NavLink>
  );
};
