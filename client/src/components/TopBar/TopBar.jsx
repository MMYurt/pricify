import React from "react";
import "./TopBar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

export default function TopBar() {
  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo">Pricify</span>
        </div>
        <div className="topRight">
          <div className="topBarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topBarIconContainer">
            <Language />
          </div>

          <div className="topBarIconContainer">
            <Settings />
          </div>
          <img
            src="https://pbs.twimg.com/profile_images/1120123137729888257/maEXQtvv_400x400.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
