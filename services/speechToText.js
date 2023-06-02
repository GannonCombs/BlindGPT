import { queryGpt } from '../pages/api/queryGpt' // Import the queryGpt function

// speechToText.js
export const startListening = () => {
  // Check if the browser supports the Web Speech API
  if (!('SpeechRecognition' in window)) {
    console.error('Your browser does not support the Web Speech API')
    return
  }

  // Create a new instance of SpeechRecognition
  const recognition = new window.SpeechRecognition()

  // Set the recognition language to English
  recognition.lang = 'en-US'

  // Start the speech recognition service
  recognition.start()

  // This event is fired when the speech recognition service has a result
  recognition.onresult = (event) => {
    // Get the transcript of the recognized speech
    const transcript = event.results[0][0].transcript

    // Check if the transcript is the command to start recording
    if (transcript.toLowerCase() === 'start prompt') {
      console.log("Prompt starting!!!")
      // Call the function to start recording
      startRecording()
    }

    // Check if the transcript is the command to stop recording
    if (transcript.toLowerCase() === 'end prompt') {
      console.log("Prompt ending!!!")
      // Call the function to stop recording
      stopRecording()
    }

    if (transcript.toLowerCase() === 'submit prompt') {
      console.log("Prompt submitting!!!")
      // Convert the recorded audio to text using the Whisper API
      const text = convertAudioToText(); // This function will be implemented later

      // Call queryGpt with the converted text
      queryGpt(text);
    }
  }
}

// This function will be implemented later
export const startRecording = () => {
  console.log('Starting recording...')
}

// This function will be implemented later
export const stopRecording = () => {
  console.log('Stopping recording...')
}

// This function will be implemented later
export const convertAudioToText = () => {
  console.log('Converting audio to text...');
  // Call the Whisper API to convert the recorded audio to text
  // Return the converted text
};
