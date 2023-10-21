import React, { useState } from "react";

interface ChannelListProps {
  channels: string[];
  onAddChannel: (name: string) => void;
  onSelectChannel: (name: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, onAddChannel, onSelectChannel }) => {
  const [channelName, setChannelName] = useState<string>("");

  const handleAddChannel = () => {
    if (channelName.trim()) {
      onAddChannel(channelName);
      setChannelName("");
    }
  };

  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div key={channel} onClick={() => onSelectChannel(channel)}>
          {channel}
        </div>
      ))}
      <div className="add-channel">
        <input value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="New channel name" />
        <button onClick={handleAddChannel}>Add Channel</button>
      </div>
    </div>
  );
};

export default ChannelList;