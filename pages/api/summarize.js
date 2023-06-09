// pages/api/summarize.js
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const { prompt } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt + '\nSummarize the conversation above. The result should be at most thirty characters. Be very sure not to include any contextual fluff phrases, such as "person 1 asked person 2" or "this conversation involves".',
    temperature: 0.3,
    max_tokens: 7,
  });

  const summary = response.data.choices[0].text;

  res.status(200).json({ summary: summary.trim() });
}
