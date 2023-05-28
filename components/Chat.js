// components/Chat.js
import React from 'react';
import chatStyles from "../styles/Chat.module.css"

const Chat = ({ conversation }) => (
  <div className={chatStyles.chat}>
    {conversation.map((message, i) => (
      <p key={i} className={i % 2 === 0 ? 'you' : 'ai'}>
        <strong>{i % 2 === 0 ? 'You' : 'AI'}:</strong> {message}
      </p>
    ))}
  </div>
);


export default Chat;
