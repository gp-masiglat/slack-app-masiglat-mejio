import React, { useState } from "react";

interface ChannelProps {
  members: string[];
  messages: string[];
  onSendMessage: (message: string) => void;
}

const Channel: React.FC<ChannelProps> = ({ members, messages, onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="channel">
      <div className="members">
        {members.join(", ")}
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
    </div>
  );
};

export default Channel;