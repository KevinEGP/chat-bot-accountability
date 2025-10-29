import express from "express";
import twilio from "twilio";
import { parseMessage } from "../services/aiParser.js";
import { appendToSheet } from "../services/googleSheets.js";
import { logger } from "../utils/logger.js";

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
		responseMessage = `✅ Información guardada!
			Tipo: ${parsed.action}
			Cliente: ${parsed.client}
			Caso: ${parsed.identifier || 'General'}
			Valor: ${parsed.amount.toLocaleString()}`
		
  } catch (error) {
		logger.error("Error on parse: ", error.message);		
    responseMessage = "❌ Error al procesar el mensaje. Por favor, intenta de nuevo.";
  }
  
  logger.info(`🛠️ Parsed data ${JSON.stringify(parsed)}`);

	try {
    if (parsed) await appendToSheet(parsed);
	} catch (error) {
			logger.error("Error on log to sheet: ", error.message);
			responseMessage = "❌ Error al procesar el mensaje. Por favor, intenta de nuevo.";		
  }
  
  const twiml = new MessagingResponse();
  twiml.message(responseMessage);

  res.type("text/xml").send(twiml.toString());
});

export default router;