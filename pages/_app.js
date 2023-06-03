import '../styles/globals.css'
import ChatContext from '../contexts/ChatContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat}}>
      <Component {...pageProps} />
    </ChatContext.Provider>
  )
}

export default MyApp
