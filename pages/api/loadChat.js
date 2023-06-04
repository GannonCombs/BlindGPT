// pages/api/loadChat.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { chatName } = req.query;

  const filePath = path.join(process.cwd(), 'public', 'logs', `${chatName}.txt`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Split the file contents into lines
  const lines = fileContents.split('\n');

  // Initialize an empty array to hold the formatted conversation
  const conversation = [];

  // Iterate over each line
  for (let i = 0; i < lines.length; i++) {
    // If the line starts with "You: " or "AI: ", add it to the conversation array as is
    if (lines[i].startsWith('You: ') || lines[i].startsWith('AI: ')) {
      conversation.push(lines[i]);
    } else {
      // If the line doesn't start with "You: " or "AI: ", it's a continuation of the previous line
      // Add it to the last element of the conversation array with a newline character in front
      conversation[conversation.length - 1] += '\n' + lines[i];
    }
  }

  res.status(200).json(conversation);
}
