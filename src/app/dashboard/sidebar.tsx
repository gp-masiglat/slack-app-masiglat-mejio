import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { sidebardata } from "./sidebardata";
import "./sidebar.css";
import { IconContext } from "react-icons";
import ChannelList from "./ChannelList";

type SidebarItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  cName: string;
};

interface SidebarProps {
  showSidebar: () => void;
  hideSidebar: () => void;
  channels: string[];
  onAddChannel: (name: string) => void;
  onSelectChannel: (name: string) => void;
}

function Sidebar({ showSidebar, hideSidebar }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /*useEffect(() => {
    setSidebarOpen(showSidebar);
  }, [showSidebar]); */

  const onSidebarClose = () => {
    hideSidebar();
    setSidebarOpen(false);
  };

  return (
    <IconContext.Provider value={{ color: "black" }}>
      <div className="sidebar">
        <nav className={sidebarOpen ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={onSidebarClose}>
            <div>
              {sidebardata.map((item: SidebarItem, index: number) => (
                <li key={index} className={item.cName}>
                  <Link href={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
              <ChannelList channels={channels} onAddChannel={onAddChannel} onSelectChannel={onSelectChannel} />
            </div>
          </ul>
        </nav>
      </div>
    </IconContext.Provider>
  );
}

export default Sidebar;
