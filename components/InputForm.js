// components/InputForm.js
import React, { useState } from 'react'
import inputFormStyles from '../styles/InputForm.module.css'
import { FaMicrophone, FaStopCircle } from 'react-icons/fa'
const MicRecorder = require('mic-recorder-to-mp3')
import { saveAs } from 'file-saver';

const InputForm = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState(
    new MicRecorder({
      bitRate: 128,
    }),
  )

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const handlePromptSubmit = (event) => {
    event.preventDefault()
    onPromptSubmit(prompt)
    setPrompt('')
  }

  const handleRecordClick = () => {
    if (isRecording) {
      //stop recording
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          //Create an mp3 file
          const file = new File(buffer, 'voiceRecording.mp3', {
            type: blob.type,
            lastModified: Date.now(),
          })

          //play it back if you want to
          const player = new Audio(URL.createObjectURL(file))
          player.play()
          console.log('Type of audio: ', typeof file)

          //save the audio file
          var FileSaver = require('file-saver');
          const now = new Date();
          const timestamp = now.toISOString().replace(/[-:.]/g, '');
          const filename = `_${timestamp}.wav`;
          FileSaver.saveAs(blob, `blindGpt_log${filename}`);
          
          //attempt to save audio file without popup
          //doesn't currently work
          //saveAudio(file)

          //convert audio to text
          speechToText(file)
        })
        .catch((e) => {
          alert('We could not retrieve your message')
          console.log(e)
        })
    } else {
      //start recording
      recorder
        .start()
        .then(() => {
          // something else
        })
        .catch((e) => {
          console.error(e)
        })
    }
    setIsRecording(!isRecording)
  }

  const saveAudio = async (audioFile) => {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      const response = await fetch('/api/saveAudio', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }

  }


  const speechToText = async (audioFile) => {
    console.log('Going to convert speech...')

    const formData = new FormData()
    formData.append('model', 'whisper-1')
    formData.append('file', audioFile)

    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error('An error occurred while converting text to speech.')
    }

    const data = await response.json()

    const transcript = data.text
    console.log('Transcribed data: ', transcript)

    setPrompt(transcript)
  }

  return (
    <form className={inputFormStyles.inputForm} onSubmit={handlePromptSubmit}>
      <label htmlFor="user_input" className={inputFormStyles.spaceLabel}>Type or speak your prompt:</label>
      <br />
      <div className={inputFormStyles.inputGroup}>
        <input
          type="text"
          id="user_input"
          name="user_input"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Type your prompt..."
        />

        <button className={inputFormStyles.funButton} type="submit">
          <span>Submit</span>
          <svg aria-hidden>
            <circle></circle>
          </svg>
        </button>

        <button
          type="button"
          onClick={handleRecordClick}
          className={`${inputFormStyles.button} ${inputFormStyles.object}`}
        >
          <div className={inputFormStyles.outline}></div>
          <div className={inputFormStyles.outline} id="delayed"></div>
          {isRecording ? (
            <FaStopCircle size={50} />
          ) : (
            <FaMicrophone size={50} />
          )}
        </button>
      </div>
    </form>
  )
}

export default InputForm
