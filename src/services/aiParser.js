// ai-parser.js
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// pick a model you have access to (see "list models" below)
const MODEL = "gemini-2.0-flash"; // example — confirm with listModels

/**
 * parseMessage: sends prompt and expects a strict JSON response
 * returns parsed object or null if parsing fails
 */
export async function parseMessage(text) {
  const prompt = `
You are an assistant that MUST respond ONLY with a single valid JSON object, no extra text.
Extract these fields if present: action (Deuda|Abono) Deuda is related to "Entregar or Llevar" | Abono is related to "Pagar or Abonar",
client (string or null), identifier (number or null) is related to "Caso, Modelo o Protesis", amount (number or null).

Input message:
"""${text}"""
  
Return JSON like:
{"action":"Deuda","client":"Ana","identifier":"1234","amount":25000}
`;

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
    console.error("AI returned invalid JSON:", raw);
    return null;
  }
}
