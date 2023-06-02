// pages/api/convertTextToSpeech.js
export default async function handler(req, res) {
  const { inputText } = req.body;

  // Set the ID of the voice to be used.
  const VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

  // Set options for the API request.
  const options = {
    method: 'POST',
    headers: {
      accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
      'content-type': 'application/json', // Set the content type to application/json.
      'xi-api-key': `${process.env.ELEVENLABS_API_KEY}`, // Set the API key in the headers.
    },
    body: JSON.stringify({
      text: inputText, // Pass in the inputText as the text to be converted to speech.
    }),
  };

  // Send the API request using fetch and wait for the response.
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, options);

  // Check if the request was successful
  if (!response.ok) {
    res.status(response.status).json({ message: 'An error occurred while converting text to speech.' });
    return;
  }

  // Get the binary audio data from the response.
  const audioData = await response.arrayBuffer();

  // Return the binary audio data as a Buffer.
  res.status(200).send(Buffer.from(audioData));
}
