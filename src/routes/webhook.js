import express from "express";
import twilio from "twilio";
import { parseMessage } from "../services/aiParser.js";
import { appendToSheet } from "../services/googleSheets.js";
import { logger } from "../utils/logger.js";
import { messages } from "../utils/messages.js";

const router = express.Router();
const { MessagingResponse } = twilio.twiml;

router.post("/", async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;

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

  const twiml = new MessagingResponse();
  twiml.message(responseMessage);

  res.type("text/xml").send(twiml.toString());
});

export default router;