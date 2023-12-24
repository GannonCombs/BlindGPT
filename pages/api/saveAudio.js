import fs from 'fs';
import path from 'path';

const handler = (req, res) => {
  const { file } = req.body;
  console.log("got here")

  if (!file) {
    console.log("No file")
    return res.status(400).send('No file provided');
  }

  const filePath = path.join(process.cwd(), 'public/audioLogs', 'voiceRecording.mp3');

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  })
    .then(() => {
      res.status(200).send('File uploaded successfully');
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('File upload failed');
    });
};

export default handler;
