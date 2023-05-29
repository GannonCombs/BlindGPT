// components/Sidebar.js
import React, { useEffect, useState, useContext } from 'react'
import sidebarStyles from '../styles/Sidebar.module.css'
import ChatContext from '../contexts/ChatContext';

const Sidebar = () => {
  const [logs, setLogs] = useState([])
  const [deleteMode, setDeleteMode] = useState(null)
  const { currentChat, setCurrentChat } = useContext(ChatContext);

  useEffect(() => {
    fetch('/api/logs')
      .then((response) => response.json())
      .then((data) => {
        setLogs(data)
        if (data.length > 0 && !currentChat) {
          setCurrentChat(data[0]);
        }
      })
  }, [])

  const handleDeleteClick = (log) => {
    if (deleteMode === log) {
      setDeleteMode(null)
    } else {
      setDeleteMode(log)
    }
  }

  const deleteChat = (log) => {
    console.log("Log: " , log)
    fetch(`/api/deleteChat?chatName=${encodeURIComponent(log)}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Chat deleted successfully') {
        // Remove the chat from the logs state
        setLogs(logs.filter(chat => chat !== log));
      } else {
        console.error('An error occurred:', data.message);
      }
    });
  }
  

  return (
    <div className={sidebarStyles.sidebar}>
      <a onClick={() => setCurrentChat("$")}>New Chat ➕</a>
      {logs.map((log) => (
        <div key={log}>
        <a 
        onClick={() => setCurrentChat(log)}
        style={log === currentChat ? { color: '#8fd3f4' } : {}}
        >
          <div>{log}</div>
          {deleteMode === log ? (
            <>
              <span onClick={() => deleteChat(log)}>✅</span>
              <span onClick={() => handleDeleteClick(log)}>❌</span>
            </>
          ) : (
            <span role="img" aria-label="Delete" onClick={() => handleDeleteClick(log)}>🗑️</span>
          )}
        </a>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
