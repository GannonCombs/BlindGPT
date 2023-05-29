// pages/api/queryGpt.js
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const { prompt } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ['You:'],
  });

  const answer = response.data.choices[0].text;

  res.status(200).json({ answer: answer.trim() });
}
