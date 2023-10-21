"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Channel from "./Channel";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [channels, setChannels] = useState<string[]>(JSON.parse(localStorage.getItem("channels") || "[]"));
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, string[]>>(JSON.parse(localStorage.getItem("messages") || "{}"));
  const [channelMembers, setChannelMembers] = useState<Record<string, string[]>>(JSON.parse(localStorage.getItem("channelMembers") || "{}"));

  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
    localStorage.setItem("messages", JSON.stringify(messages));
    localStorage.setItem("channelMembers", JSON.stringify(channelMembers));
  }, [channels, messages, channelMembers]);

  const handleAddChannel = (name: string) => {
    setChannels([...channels, name]);
    setMessages({ ...messages, [name]: [] });
    setChannelMembers({ ...channelMembers, [name]: [] });
  };

  const handleSendMessage = (message: string) => {
    if (selectedChannel) {
      setMessages({
        ...messages,
        [selectedChannel]: [...messages[selectedChannel], message],
      });
    }
  };

  const handleAddMemberToChannel = (member: string) => {
    if (selectedChannel) {
      setChannelMembers({
        ...channelMembers,
        [selectedChannel]: [...channelMembers[selectedChannel], member],
      });
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <Sidebar
          channels={channels}
          onAddChannel={handleAddChannel}
          onSelectChannel={setSelectedChannel}
        />
      </header>
      {selectedChannel && (
        <Channel
          members={channelMembers[selectedChannel] || []}
          messages={messages[selectedChannel] || []}
          onSendMessage={handleSendMessage}
          onAddMember={handleAddMemberToChannel}
        />
      )}
    </div>
  );
};

export default Dashboard;