// ai-parser.js
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import { messages } from '../utils/messages.js';
import { logger } from '../utils/logger.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.0-flash";

/**
 * parseMessage: sends prompt and expects a strict JSON response
 * returns parsed object or null if parsing fails
 */
export async function parseMessage(text) {
  const prompt = messages.aiPrompt(text);

  const resp = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const raw = resp?.text ?? resp?.response?.text ?? JSON.stringify(resp);
  try {
    return JSON.parse(raw);
  } catch (err) {
    logger.error("AI returned invalid JSON:", raw);
    return null;
  }
}
