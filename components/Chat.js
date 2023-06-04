// components/Chat.js
import React from 'react';
import chatStyles from "../styles/Chat.module.css"

const Chat = ({ conversation }) => (
  <div className={chatStyles.chat}>
    {conversation.map((message, i) => {
      const [prefix, ...textParts] = message.split(':');
      const text = textParts.join(':').trim();
      return (
        <p key={i} className={i % 2 === 0 ? 'you' : 'ai'}>
          <strong>{prefix}:</strong> {text}
        </p>
      );
    })}
  </div>
);

export default Chat;
