import React from "react";
import "./SideBar.css";
import { LineStyle } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Dashboard</h3>
          <ul className="sideBarList">
            <Link to="/" className="link">
              <li className="sideBarListItem active">
                <LineStyle className="sideBarIcon" />
                Home
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sideBarListItem">
                <LineStyle className="sideBarIcon" />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
