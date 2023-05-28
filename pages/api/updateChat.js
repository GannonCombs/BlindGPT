// pages/api/updateChat.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { chatName, prompt, answer, isNewChat } = req.body;

  const filePath = path.join(process.cwd(), 'public', 'logs', `${chatName}.txt`);

  // Append the new lines to the file
  if(isNewChat) {
    fs.appendFileSync(filePath, `You: ${prompt}\nAI: ${answer}`);
  }
  else {
    fs.appendFileSync(filePath, `\nYou: ${prompt}\nAI: ${answer}`);
  }
  

  res.status(200).json({ message: 'Chat updated successfully' });
}
