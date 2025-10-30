import { google } from "googleapis";
import { logger } from "../utils/logger.js";
import { messages } from "../utils/messages.js";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendToSheet(data) {
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const spreadsheetId = messages.spreadsheetId;
  const range = "Logs!A2";

  if (!data || data.action === null || data.client === null || data.amount === null || data.method === null) {
    throw new Error("Not valid data provided");
  }

  const values = [
    [new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}), data.action, data.client, data.identifier, data.amount, data.method]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });

  logger.info("✅ Data added to Google Sheet");
}
