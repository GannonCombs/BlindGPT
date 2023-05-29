// pages/index.js
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Chat from '../components/Chat'
import InputForm from '../components/InputForm'
import { useContext, useEffect } from 'react'
import ChatContext from '../contexts/ChatContext'
// import textToSpeech from './api/convertTextToSpeech'

const HomePage = () => {
  const { currentChat } = useContext(ChatContext)
  const [conversation, setConversation] = useState([])

  useEffect(() => {
    if (currentChat) {
      // Load and display the content of the current chat
      console.log('Current chat: ', currentChat)
      if (currentChat == '$') {
        startNewChat()
      } else {
        loadChat()
      }
    }
  }, [currentChat])


  const loadChat = () => {
    console.log('Loading chat...')
    fetch(`/api/loadChat?chatName=${currentChat}`)
    .then(response => response.json())
    .then(data => {
      setConversation(data)
      console.log("Loaded convo: " , data)
    });
  }

  const startNewChat = () => {
    console.log('Starting new chat...')

    setConversation([])
  }

  const queryGpt = async (prompt) => {

    const response = await fetch('/api/queryGpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const answer = data.answer;
    updateChat(prompt, answer)
    
  }

  const updateChat = async (prompt, answer) => {
    //add to array
    const newConversation = [...conversation, prompt, answer];
    console.log("new convo:" , newConversation)
    setConversation(newConversation)

    var newFileName = "";

    if(currentChat == "$") { //new chat
      //summarize (to get file name)
      const summary = await summarize(prompt)
      console.log("Summary: " , summary)

      //create new text file
      const response = await fetch('/api/createChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newConversation,
          summary,
        }),
      });
      const data = await response.json();
      newFileName = data.fileName;
    }

    var chatName = currentChat;
    var isNewChat = false;
    if( newFileName != "") {
      chatName = newFileName;
      isNewChat = true;
    }

    //update text file
    await fetch('/api/updateChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatName: chatName,
        prompt,
        answer,
        isNewChat,
      }),
    });

    // Convert the OpenAI response to speech and play it
    const audioURL = await textToSpeech(answer);
    const audio = new Audio(audioURL);
    audio.play();
  }

  const textToSpeech = async (inputText) => {
    const response = await fetch('/api/convertTextToSpeech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText }),
    });
  
    if (!response.ok) {
      throw new Error('An error occurred while converting text to speech.');
    }
  
    const audioData = await response.arrayBuffer();
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    return url;
  };

 

  const summarize = async (prompt) => {

    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.summary;
  }

  const handlePromptSubmit = (prompt) => {
    console.log('Prompt bubbled up:', prompt)
    queryGpt(prompt)
  }

  return (
    <Layout>
      <Chat conversation={conversation} />
      <InputForm onPromptSubmit={handlePromptSubmit} />
    </Layout>
  )
}

export default HomePage
