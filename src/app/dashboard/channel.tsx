import React, { useState } from "react";

interface ChannelProps {
  members: string[];
  messages: string[];
  onSendMessage: (message: string) => void;
  onAddMember: (member: string) => void;
}

const Channel: React.FC<ChannelProps> = ({ members, messages, onSendMessage, onAddMember }) => {
  const [message, setMessage] = useState<string>("");
  const [newMember, setNewMember] = useState<string>("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleAddMember = () => {
    if (newMember.trim() !== "" && !members.includes(newMember)) {
      onAddMember(newMember);
      setNewMember("");
    }
  };

  return (
    <div className="channel">
      <div className="members">
        Members: {members.join(", ")}
      </div>
      <div className="messages">
        {messages.map((msg, idx) => <div key={idx}>{msg}</div>)}
      </div>
      <div className="input-area">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <div className="add-member">
        <input
          value={newMember}
          onChange={e => setNewMember(e.target.value)}
          placeholder="Add member..."
        />
        <button onClick={handleAddMember}>Add Member</button>
      </div>
    </div>
  );
};

export default Channel;