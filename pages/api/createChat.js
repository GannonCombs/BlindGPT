// pages/api/createChat.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { conversation, summary } = req.body;

  // Create a file name from the summary
  const fileName = summary.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const filePath = path.join(process.cwd(), 'public', 'logs', `${fileName}.txt`);

  // Write the conversation to the new text file
  fs.writeFileSync(filePath, conversation.join('\n'));

  // Return the file name as the response
  res.status(200).json({ fileName });
}
