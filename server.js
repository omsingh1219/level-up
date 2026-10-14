import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import http from 'http';

// Load variables from your local .env file securely
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Gemini client wrapper using your secure server variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log("Sending prompt to Gemini:", prompt);

    // Call the flagship, available production model
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
    });

    console.log("Gemini Success Response received!");
    res.json({ reply: response.text });
  } catch (error) {
    console.error("❌ GEMINI SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

// Create an explicit HTTP server instance to override connection timeouts
const server = http.createServer(app);

// Set high timeouts (5 minutes) so long generation tasks are never dropped silently
server.timeout = 300000; 
server.headersTimeout = 300000; 
server.requestTimeout = 300000;

server.listen(PORT, () => console.log(`Secure backend running on http://localhost:${PORT}`));
