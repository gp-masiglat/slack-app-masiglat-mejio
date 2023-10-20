"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Channel from "./Channel";
import "./dashboard.css";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [channels, setChannels] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, string[]>>({});

  const handleAddChannel = (name: string) => {
    setChannels([...channels, name]);
    setMessages({ ...messages, [name]: [] });
  };

  const handleSelectChannel = (name: string) => {
    setSelectedChannel(name);
  };

  const handleSendMessage = (message: string) => {
    if (selectedChannel) {
      setMessages({
        ...messages,
        [selectedChannel]: [...messages[selectedChannel], message],
      });
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <Sidebar
          showSidebar={() => setSidebarOpen(true)}
          hideSidebar={() => setSidebarOpen(false)}
          channels={channels}
          onAddChannel={handleAddChannel}
          onSelectChannel={handleSelectChannel}
        />
      </header>
      {selectedChannel && (
        <Channel
          members={[]} // No Logic Yet
          messages={messages[selectedChannel] || []}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Dashboard;