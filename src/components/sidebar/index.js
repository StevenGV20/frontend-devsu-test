import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./_.css";
import { routes_menu } from "../../routes/routes";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul>
        {routes_menu.map((route) => (
          <li className="item-menu" key={route.name}>
            <Link to={route.url}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
