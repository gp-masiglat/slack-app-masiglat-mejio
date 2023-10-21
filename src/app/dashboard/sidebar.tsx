import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { sidebardata } from "./sidebardata";
import "./sidebar.css";
import { IconContext } from "react-icons";
import ChannelList from "./ChannelList";

interface SidebarProps {
  channels: string[];
  onAddChannel: (name: string) => void;
  onSelectChannel: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ channels, onAddChannel, onSelectChannel }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(true);
    return () => {
      setSidebarOpen(false);
    };
  }, []);

  const handleAddChannel = (name: string) => {
    onAddChannel(name);
    setSidebarOpen(false);
  };

  const handleSelectChannel = (name: string) => {
    onSelectChannel(name);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <IconContext.Provider value={{ color: "black" }}>
      <div className="sidebar">
        <button onClick={toggleSidebar}>X</button>
        <nav className={sidebarOpen ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {sidebardata.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <ChannelList channels={channels} onAddChannel={handleAddChannel} onSelectChannel={handleSelectChannel} />
          </ul>
        </nav>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;