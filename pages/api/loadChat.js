// pages/api/loadChat.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { chatName } = req.query;

  const filePath = path.join(process.cwd(), 'public', 'logs', `${chatName}.txt`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Split the file contents into lines and remove "You: " and "AI: "
  const conversation = fileContents.split('\n').map(line => line.split(': ')[1]);

  res.status(200).json(conversation);
}