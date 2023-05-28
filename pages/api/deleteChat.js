// pages/api/deleteChat.js
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { chatName } = req.query;

  console.log("Chat name: " , chatName)
  if (!chatName) {
    res.status(400).json({ message: 'Chat name is required' });
    return;
  }

  const filePath = path.join(process.cwd(), 'public', 'logs', `${chatName}.txt`);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the chat' });
  }
}
