import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const logsDirectory = path.join(process.cwd(), 'public', 'logs');
  const filenames = fs.readdirSync(logsDirectory);

  // Remove the .txt extension from each filename
  const logs = filenames.map(filename => filename.replace('.txt', ''));

  res.status(200).json(logs);
}
