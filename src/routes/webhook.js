import express from "express";
import axios from "axios";
import { parseMessage } from "../services/aiParser.js";
import { appendToSheet } from "../services/googleSheets.js";
import { logger } from "../utils/logger.js";
import { messages } from "../utils/messages.js";
import { sendWhatsAppMessage } from "./whatsappService.js";

const router = express.Router();
const verifyToken = process.env.VERIFY_TOKEN;

router.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

router.post("/", async (req, res) => {
  const change = req.body.entry?.[0]?.changes?.[0]?.value;
  const message = change?.messages?.[0];
  if (!message || !message.text) return res.sendStatus(200);

  const from = message.from;
  const body = message.text.body;

  logger.info(`📩 Message from ${from}: ${body}`);
  let parsed = null;
	let responseMessage = "";
  try {
    parsed = await parseMessage(body);
		responseMessage = messages.success(parsed);	
  } catch (error) {
		logger.error("Error on parse: ", error.message);		
    responseMessage = messages.parseError;
  }
  
  logger.info(`🛠️ Parsed data ${JSON.stringify(parsed)}`);

	try {
    if (parsed) await appendToSheet(parsed);
	} catch (error) {
			logger.error("Error on log to sheet: ", error.message);
			responseMessage = messages.parseError;
  }

  try {
    await sendWhatsAppMessage(from, responseMessage);    
  } catch (error) {
    logger.error("Error on send response: ", error.message);
    responseMessage = messages.parseError;
  }
  res.sendStatus(200);
});

export default router;